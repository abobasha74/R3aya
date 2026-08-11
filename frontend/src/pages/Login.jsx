import { AppContext } from "../context/AppContext";
import axios from "axios";
import { showSuccess, showError } from "../utils/toastSound";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          showSuccess("Account created successfully");

          localStorage.setItem("token", data.token);

          setToken(data.token);
        } else {
          showError(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          showSuccess("Login successfully");

          localStorage.setItem("token", data.token);

          setToken(data.token);
        } else {
          showError(data.message);
        }
      }
    } catch (error) {
      console.log(error);

      showError(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <section
      className="
  relative
  flex
  min-h-[82vh]
  items-center
  justify-center
  overflow-hidden
  px-4
  py-12
  sm:px-6
"
    >
      {/* Background Decorations */}

      <div
        className="
    pointer-events-none
    absolute
    left-[-100px]
    top-[-80px]
    h-64
    w-64
    rounded-full
    bg-[#BF6952]/10
    blur-3xl
  "
      />

      <div
        className="
    pointer-events-none
    absolute
    bottom-[-100px]
    right-[-100px]
    h-72
    w-72
    rounded-full
    bg-[#312D2D]/10
    blur-3xl
  "
      />

      <form
        onSubmit={onSubmitHandler}
        className="
      relative
      z-10
      w-full
      max-w-md
      overflow-hidden
      rounded-3xl
      border
      border-gray-200
      bg-white
      shadow-xl
    "
      >
        {/* Top Section */}

        <div
          className="
      relative
      overflow-hidden
      bg-[#312D2D]
      px-7
      py-9
      text-center
      sm:px-10
    "
        >
          <div
            className="
        absolute
        -right-12
        -top-12
        h-36
        w-36
        rounded-full
        bg-[#BF6952]/20
      "
          />

          <div
            className="
        absolute
        -bottom-16
        -left-12
        h-32
        w-32
        rounded-full
        bg-white/5
      "
          />

          <div
            className="
        relative
        z-10
      "
          >
            <div
              className="
  mx-auto
  flex
  h-16
  w-25
  items-center
  justify-center
  rounded-2xl
  bg-white
  p-2
  shadow-lg
"
            >
              <img
                src={assets.logo}
                alt="R3AYA"
                className="w-full h-full object-contain"
              />
            </div>

            <p
              className="
          mt-5
          text-3xl
          font-semibold
          text-white
        "
            >
              {state === "Sign Up" ? "Create Account" : "Welcome Back"}
            </p>

            <p
              className="
          mx-auto
          mt-2
          max-w-xs
          text-sm
          leading-6
          text-gray-300
        "
            >
              {state === "Sign Up"
                ? "Create your account and book your appointment easily."
                : "Log in to manage your appointments and profile."}
            </p>
          </div>
        </div>

        {/* Form Section */}

        <div
          className="
      flex
      flex-col
      gap-5
      px-7
      py-8
      sm:px-10
    "
        >
          {/* Full Name */}

          {state === "Sign Up" ? (
            <div className="w-full">
              <label
                className="
              mb-2
              block
              text-sm
              font-medium
              text-[#312D2D]
            "
              >
                Full Name
              </label>

              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                px-4
                py-3
                text-sm
                text-[#312D2D]
                outline-none
                transition-all
                duration-300
                placeholder:text-gray-400
                focus:border-[#BF6952]
                focus:bg-white
                focus:ring-4
                focus:ring-[#BF6952]/10
              "
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>
          ) : null}

          {/* Email */}

          <div className="w-full">
            <label
              className="
          mb-2
          block
          text-sm
          font-medium
          text-[#312D2D]
        "
            >
              Email Address
            </label>

            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="
            w-full
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            px-4
            py-3
            text-sm
            text-[#312D2D]
            outline-none
            transition-all
            duration-300
            placeholder:text-gray-400
            focus:border-[#BF6952]
            focus:bg-white
            focus:ring-4
            focus:ring-[#BF6952]/10
          "
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}

          <div className="w-full">
            <label
              className="
          mb-2
          block
          text-sm
          font-medium
          text-[#312D2D]
        "
            >
              Password
            </label>

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="
            w-full
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            px-4
            py-3
            text-sm
            text-[#312D2D]
            outline-none
            transition-all
            duration-300
            placeholder:text-gray-400
            focus:border-[#BF6952]
            focus:bg-white
            focus:ring-4
            focus:ring-[#BF6952]/10
          "
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}

          <button
            type="submit"
            className="
          mt-2
          w-full
          rounded-xl
          bg-[#BF6952]
          py-3.5
          text-base
          font-medium
          text-white
          shadow-md
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-[#a95743]
          hover:shadow-lg
          active:translate-y-0
          active:scale-[0.98]
        "
          >
            {state === "Sign Up" ? "Create Account" : "Login"}
          </button>

          {/* Switch Between Login and Sign Up */}

          {state === "Sign Up" ? (
            <p
              className="
            text-center
            text-sm
            text-gray-500
          "
            >
              Already have an account?
              <span
                onClick={() => setState("Login")}
                className="
                ml-1
                cursor-pointer
                font-medium
                text-[#BF6952]
                transition-colors
                hover:text-[#312D2D]
              "
              >
                Login here
              </span>
            </p>
          ) : (
            <p
              className="
            text-center
            text-sm
            text-gray-500
          "
            >
              Don&apos;t have an account?
              <span
                onClick={() => setState("Sign Up")}
                className="
                ml-1
                cursor-pointer
                font-medium
                text-[#BF6952]
                transition-colors
                hover:text-[#312D2D]
              "
              >
                Create one
              </span>
            </p>
          )}

          {/* Bottom Message */}

          <p
            className="
        border-t
        border-gray-100
        pt-4
        text-center
        text-xs
        leading-5
        text-gray-400
      "
          >
            Book appointments with trusted healthcare professionals.
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
