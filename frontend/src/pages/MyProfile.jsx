import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { showSuccess, showError } from "../utils/toastSound";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [image, setImage] = useState(false);
  const [preview, setPreview] = useState(false);

  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);

  // Function to update user profile data using API
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (data.success) {
        showSuccess(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
        setPreview(false);
      } else {
        showError(data.message);
      }
    } catch (error) {
      console.log(error);
      showError(error.message);
    }
  };

  return userData ? (
    <section
      className="
        mx-4
        my-8
        md:mx-10
        md:my-12
        lg:mx-14
    "
    >
      <div
        className="
            mx-auto
            max-w-5xl
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-lg
        "
      >
        {/* ---------------- Profile Header ---------------- */}

        <div
          className="
                relative
                overflow-hidden
                bg-[#312D2D]
                px-6
                pb-24
                pt-10
                sm:px-10
                md:pt-14
            "
        >
          {/* Decorative Background */}

          <div
            className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-64
                    w-64
                    rounded-full
                    bg-[#BF6952]/15
                    blur-3xl
                "
          />

          <div
            className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    left-1/3
                    h-48
                    w-48
                    rounded-full
                    bg-white/5
                    blur-3xl
                "
          />

          <div
            className="
                    relative
                    z-10
                    flex
                    flex-col
                    items-center
                    text-center
                "
          >
            <p
              className="
                        text-sm
                        font-medium
                        uppercase
                        tracking-[0.25em]
                        text-[#BF6952]
                    "
            >
              My Account
            </p>

            <h1
              className="
                        mt-3
                        text-3xl
                        font-semibold
                        text-white
                        sm:text-4xl
                    "
            >
              Profile Information
            </h1>

            <p
              className="
                        mt-3
                        max-w-lg
                        text-sm
                        leading-6
                        text-gray-300
                    "
            >
              Manage your personal information and keep your profile up to date.
            </p>
          </div>
        </div>

        {/* ---------------- Profile Content ---------------- */}

        <div
          className="
                relative
                px-5
                pb-8
                sm:px-8
                md:px-12
                md:pb-12
            "
        >
          {/* ---------------- Profile Image ---------------- */}

          <div
            className="
                    -mt-16
                    flex
                    flex-col
                    items-center
                "
          >
            {isEdit ? (
              <label
                htmlFor="image"
                className="
                                group
                                relative
                                cursor-pointer
                            "
              >
                <div
                  className="
                                relative
                                h-32
                                w-32
                                overflow-hidden
                                rounded-full
                                border-4
                                border-white
                                bg-gray-100
                                shadow-xl
                                sm:h-36
                                sm:w-36
                            "
                >
                  <img
                    className="
                                        h-full
                                        w-full
                                        object-cover
                                        transition-transform
                                        duration-500
                                        group-hover:scale-105
                                    "
                    src={preview || userData.image}
                    alt="Profile"
                  />

                  <div
                    className="
                                    absolute
                                    inset-0
                                    flex
                                    items-center
                                    justify-center
                                    bg-black/45
                                    opacity-0
                                    transition-opacity
                                    duration-300
                                    group-hover:opacity-100
                                "
                  >
                    <img
                      className="
                                            w-10
                                            brightness-0
                                            invert
                                        "
                      src={assets.upload_icon}
                      alt="Upload"
                    />
                  </div>
                </div>

                <div
                  className="
                                absolute
                                bottom-1
                                right-1
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                border-4
                                border-white
                                bg-[#BF6952]
                                shadow-md
                            "
                >
                  <img
                    className="
                                        w-5
                                        brightness-0
                                        invert
                                    "
                    src={assets.upload_icon}
                    alt=""
                  />
                </div>

                <input
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                      setImage(file);
                      setPreview(URL.createObjectURL(file));
                    }

                    e.target.value = "";
                  }}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <div
                className="
                            h-32
                            w-32
                            overflow-hidden
                            rounded-full
                            border-4
                            border-white
                            bg-gray-100
                            shadow-xl
                            sm:h-36
                            sm:w-36
                        "
              >
                <img
                  className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                  src={userData.image}
                  alt="Profile"
                />
              </div>
            )}

            {/* ---------------- Name ---------------- */}

            <div
              className="
                        mt-5
                        w-full
                        text-center
                    "
            >
              {isEdit ? (
                <input
                  className="
                                    mx-auto
                                    block
                                    w-full
                                    max-w-md
                                    rounded-xl
                                    border
                                    border-[#BF6952]/30
                                    bg-[#BF6952]/5
                                    px-4
                                    py-3
                                    text-center
                                    text-2xl
                                    font-semibold
                                    text-[#312D2D]
                                    outline-none
                                    transition-all
                                    focus:border-[#BF6952]
                                    focus:ring-4
                                    focus:ring-[#BF6952]/10
                                "
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  value={userData.name}
                />
              ) : (
                <>
                  <h2
                    className="
                                    text-2xl
                                    font-semibold
                                    text-[#312D2D]
                                    sm:text-3xl
                                "
                  >
                    {userData.name}
                  </h2>

                  <p
                    className="
                                    mt-2
                                    text-sm
                                    text-gray-500
                                "
                  >
                    Personal Profile
                  </p>
                </>
              )}
            </div>
          </div>

          {/* ---------------- Information Cards ---------------- */}

          <div
            className="
                    mt-10
                    grid
                    grid-cols-1
                    gap-6
                    lg:grid-cols-2
                "
          >
            {/* Contact Information */}

            <div
              className="
                        rounded-2xl
                        border
                        border-gray-200
                        bg-[#FAFAFA]
                        p-5
                        shadow-sm
                        sm:p-7
                    "
            >
              <div
                className="
                            mb-6
                            flex
                            items-center
                            gap-3
                            border-b
                            border-gray-200
                            pb-4
                        "
              >
                <div
                  className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-[#BF6952]/10
                                text-lg
                                font-semibold
                                text-[#BF6952]
                            "
                >
                  C
                </div>

                <div>
                  <p
                    className="
                                    text-lg
                                    font-semibold
                                    text-[#312D2D]
                                "
                  >
                    Contact Information
                  </p>

                  <p
                    className="
                                    mt-1
                                    text-xs
                                    text-gray-500
                                "
                  >
                    Your contact details
                  </p>
                </div>
              </div>

              <div
                className="
                            flex
                            flex-col
                            gap-5
                        "
              >
                {/* Email */}

                <div>
                  <p
                    className="
                                    mb-1
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-gray-400
                                "
                  >
                    Email Address
                  </p>

                  <p
                    className="
                                    break-all
                                    text-sm
                                    font-medium
                                    text-[#BF6952]
                                "
                  >
                    {userData.email}
                  </p>
                </div>

                {/* Phone */}

                <div>
                  <p
                    className="
                                    mb-2
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-gray-400
                                "
                  >
                    Phone Number
                  </p>

                  {isEdit ? (
                    <input
                      className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-white
                                            px-4
                                            py-3
                                            text-sm
                                            text-[#312D2D]
                                            outline-none
                                            transition-all
                                            focus:border-[#BF6952]
                                            focus:ring-4
                                            focus:ring-[#BF6952]/10
                                        "
                      type="text"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      value={userData.phone}
                    />
                  ) : (
                    <p
                      className="
                                        text-sm
                                        text-gray-600
                                    "
                    >
                      {userData.phone}
                    </p>
                  )}
                </div>

                {/* Address */}

                <div>
                  <p
                    className="
                                    mb-2
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-gray-400
                                "
                  >
                    Address
                  </p>

                  {isEdit ? (
                    <div
                      className="
                                        flex
                                        flex-col
                                        gap-3
                                    "
                    >
                      <input
                        className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-white
                                                px-4
                                                py-3
                                                text-sm
                                                outline-none
                                                transition-all
                                                focus:border-[#BF6952]
                                                focus:ring-4
                                                focus:ring-[#BF6952]/10
                                            "
                        type="text"
                        placeholder="Address line 1"
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            address: {
                              ...prev.address,
                              line1: e.target.value,
                            },
                          }))
                        }
                        value={userData.address.line1}
                      />

                      <input
                        className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-white
                                                px-4
                                                py-3
                                                text-sm
                                                outline-none
                                                transition-all
                                                focus:border-[#BF6952]
                                                focus:ring-4
                                                focus:ring-[#BF6952]/10
                                            "
                        type="text"
                        placeholder="Address line 2"
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            address: {
                              ...prev.address,
                              line2: e.target.value,
                            },
                          }))
                        }
                        value={userData.address.line2}
                      />
                    </div>
                  ) : (
                    <p
                      className="
                                        text-sm
                                        leading-6
                                        text-gray-600
                                    "
                    >
                      {userData.address.line1}
                      <br />
                      {userData.address.line2}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Information */}

            <div
              className="
                        rounded-2xl
                        border
                        border-gray-200
                        bg-[#FAFAFA]
                        p-5
                        shadow-sm
                        sm:p-7
                    "
            >
              <div
                className="
                            mb-6
                            flex
                            items-center
                            gap-3
                            border-b
                            border-gray-200
                            pb-4
                        "
              >
                <div
                  className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-[#BF6952]/10
                                text-lg
                                font-semibold
                                text-[#BF6952]
                            "
                >
                  I
                </div>

                <div>
                  <p
                    className="
                                    text-lg
                                    font-semibold
                                    text-[#312D2D]
                                "
                  >
                    Basic Information
                  </p>

                  <p
                    className="
                                    mt-1
                                    text-xs
                                    text-gray-500
                                "
                  >
                    Your personal details
                  </p>
                </div>
              </div>

              <div
                className="
                            flex
                            flex-col
                            gap-5
                        "
              >
                {/* Gender */}

                <div>
                  <p
                    className="
                                    mb-2
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-gray-400
                                "
                  >
                    Gender
                  </p>

                  {isEdit ? (
                    <select
                      className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-white
                                            px-4
                                            py-3
                                            text-sm
                                            outline-none
                                            transition-all
                                            focus:border-[#BF6952]
                                            focus:ring-4
                                            focus:ring-[#BF6952]/10
                                        "
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                      value={userData.gender}
                    >
                      <option value="Not Selected">Not Selected</option>

                      <option value="Male">Male</option>

                      <option value="Female">Female</option>
                    </select>
                  ) : (
                    <p
                      className="
                                        text-sm
                                        text-gray-600
                                    "
                    >
                      {userData.gender}
                    </p>
                  )}
                </div>

                {/* Birthday */}

                <div>
                  <p
                    className="
                                    mb-2
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-gray-400
                                "
                  >
                    Date of Birth
                  </p>

                  {isEdit ? (
                    <input
                      className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-white
                                            px-4
                                            py-3
                                            text-sm
                                            outline-none
                                            transition-all
                                            focus:border-[#BF6952]
                                            focus:ring-4
                                            focus:ring-[#BF6952]/10
                                        "
                      type="date"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          dob: e.target.value,
                        }))
                      }
                      value={userData.dob}
                    />
                  ) : (
                    <p
                      className="
                                        text-sm
                                        text-gray-600
                                    "
                    >
                      {userData.dob}
                    </p>
                  )}
                </div>

                {/* Account Status */}

                <div>
                  <p
                    className="
                                    mb-2
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-gray-400
                                "
                  >
                    Account Status
                  </p>

                  <span
                    className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    bg-green-50
                                    px-4
                                    py-2
                                    text-xs
                                    font-medium
                                    text-green-600
                                "
                  >
                    <span
                      className="
                                        h-2
                                        w-2
                                        rounded-full
                                        bg-green-500
                                    "
                    />
                    Active Account
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- Action Button ---------------- */}

          <div
            className="
                    mt-8
                    flex
                    justify-center
                "
          >
            {isEdit ? (
              <button
                onClick={updateUserProfileData}
                className="
                                rounded-full
                                bg-[#BF6952]
                                px-10
                                py-3.5
                                text-sm
                                font-medium
                                text-white
                                shadow-md
                                transition-all
                                duration-300
                                hover:scale-105
                                hover:shadow-lg
                                active:scale-95
                            "
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="
                                rounded-full
                                border
                                border-[#BF6952]
                                bg-white
                                px-10
                                py-3.5
                                text-sm
                                font-medium
                                text-[#BF6952]
                                shadow-sm
                                transition-all
                                duration-300
                                hover:scale-105
                                hover:bg-[#BF6952]
                                hover:text-white
                                hover:shadow-lg
                                active:scale-95
                            "
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default MyProfile;
