import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

import { showError } from "../utils/toastSound";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "EGP";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(false);

  // Getting Doctors using API
  const getDoctosData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        showError(data.message);
      }
    } catch (error) {
      console.log(error);
      showError(error.message);
    }
  }, [backendUrl]);

  // Getting User Profile using API
  const loadUserProfileData = useCallback(async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        showError(data.message);
      }
    } catch (error) {
      console.log(error);
      showError(error.message);
    }
  }, [backendUrl, token]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void getDoctosData();
  }, [getDoctosData]);

  useEffect(() => {
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void loadUserProfileData();
    }
  }, [token, loadUserProfileData]);

  const value = useMemo(
    () => ({
      doctors,
      getDoctosData,
      currencySymbol,
      backendUrl,
      token,
      setToken,
      userData,
      setUserData,
      loadUserProfileData,
    }),
    [
      doctors,
      getDoctosData,
      currencySymbol,
      backendUrl,
      token,
      userData,
      loadUserProfileData,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
