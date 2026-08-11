import { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {

const navigate = useNavigate()

const [showMenu, setShowMenu] = useState(false)
const [showUserMenu, setShowUserMenu] = useState(false)
const userMenuRef = useRef(null)

const { token, setToken, userData } = useContext(AppContext)

// Close user menu when clicking outside
useEffect(() => {

if (!showUserMenu) return;

function handleClickOutside(e) {

  if (
    userMenuRef.current &&
    !userMenuRef.current.contains(e.target)
  ) {
    setShowUserMenu(false);
  }

}

document.addEventListener(
  "mousedown",
  handleClickOutside
);

return () => {
  document.removeEventListener(
    "mousedown",
    handleClickOutside
  );
};

}, [showUserMenu]);

const logout = () => {

localStorage.removeItem('token')

setToken(false)

navigate('/login')

}

return (

<>

  {/* ---------------- Desktop Navbar ---------------- */}

  <motion.header

    initial={{
      opacity: 0,
      y: -20
    }}

    animate={{
      opacity: 1,
      y: 0
    }}

    transition={{
      duration: 0.5,
      ease: "easeOut"
    }}

    className="
      relative
      z-40
      flex
      items-center
      justify-between
      w-full
      min-h-[82px]
      px-5
      sm:px-8
      md:px-10
      lg:px-14
      py-4
      mb-6
      text-sm
      bg-white/95
      backdrop-blur-md
      border
      border-[#BF6952]/10
      rounded-2xl
      shadow-[0_8px_30px_rgba(0,0,0,0.06)]
    "

  >

    {/* Logo */}

    <img

      onClick={() => navigate('/')}

      className="
        w-36
        sm:w-40
        md:w-44
        cursor-pointer
        select-none
        transition-transform
        duration-300
        hover:scale-105
      "

      src={assets.logo}

      alt="Logo"

      draggable="false"

    />


    {/* Nav Links */}

    <ul className="
      hidden
      md:flex
      items-center
      gap-2
      lg:gap-4
      font-semibold
      text-gray-600
    ">


      {/* HOME */}

      <NavLink to='/'>

        {({ isActive }) => (

          <li

            className={`
              relative
              px-4
              py-3
              rounded-xl
              cursor-pointer
              transition-all
              duration-300
              hover:bg-[#BF6952]/10
              ${
                isActive
                  ? "text-[#BF6952]"
                  : "hover:text-[#BF6952]"
              }
            `}

          >

            HOME

            <span

              className={`
                absolute
                left-1/2
                bottom-1
                -translate-x-1/2
                h-0.5
                rounded-full
                bg-[#BF6952]
                transition-all
                duration-300
                ${
                  isActive
                    ? "w-1/2 opacity-100"
                    : "w-0 opacity-0"
                }
              `}

            />

          </li>

        )}

      </NavLink>


      {/* ALL DOCTORS */}

      <NavLink to='/doctors'>

        {({ isActive }) => (

          <li

            className={`
              relative
              px-4
              py-3
              rounded-xl
              cursor-pointer
              transition-all
              duration-300
              hover:bg-[#BF6952]/10
              ${
                isActive
                  ? "text-[#BF6952]"
                  : "hover:text-[#BF6952]"
              }
            `}

          >

            ALL DOCTORS

            <span

              className={`
                absolute
                left-1/2
                bottom-1
                -translate-x-1/2
                h-0.5
                rounded-full
                bg-[#BF6952]
                transition-all
                duration-300
                ${
                  isActive
                    ? "w-1/2 opacity-100"
                    : "w-0 opacity-0"
                }
              `}

            />

          </li>

        )}

      </NavLink>


      {/* ABOUT */}

      <NavLink to='/about'>

        {({ isActive }) => (

          <li

            className={`
              relative
              px-4
              py-3
              rounded-xl
              cursor-pointer
              transition-all
              duration-300
              hover:bg-[#BF6952]/10
              ${
                isActive
                  ? "text-[#BF6952]"
                  : "hover:text-[#BF6952]"
              }
            `}

          >

            ABOUT

            <span

              className={`
                absolute
                left-1/2
                bottom-1
                -translate-x-1/2
                h-0.5
                rounded-full
                bg-[#BF6952]
                transition-all
                duration-300
                ${
                  isActive
                    ? "w-1/2 opacity-100"
                    : "w-0 opacity-0"
                }
              `}

            />

          </li>

        )}

      </NavLink>


      {/* CONTACT */}

      <NavLink to='/contact'>

        {({ isActive }) => (

          <li

            className={`
              relative
              px-4
              py-3
              rounded-xl
              cursor-pointer
              transition-all
              duration-300
              hover:bg-[#BF6952]/10
              ${
                isActive
                  ? "text-[#BF6952]"
                  : "hover:text-[#BF6952]"
              }
            `}

          >

            CONTACT

            <span

              className={`
                absolute
                left-1/2
                bottom-1
                -translate-x-1/2
                h-0.5
                rounded-full
                bg-[#BF6952]
                transition-all
                duration-300
                ${
                  isActive
                    ? "w-1/2 opacity-100"
                    : "w-0 opacity-0"
                }
              `}

            />

          </li>

        )}

      </NavLink>

    </ul>


    {/* Right Actions */}

    <div className='flex items-center gap-4'>


      {/* Logged In */}

      {token && userData ? (

        <div
          className='relative'
          ref={userMenuRef}
        >

          <button

            onClick={() => {
              setShowUserMenu(
                (previous) => !previous
              )
            }}

            className="
              flex
              items-center
              gap-2
              rounded-full
              p-1
              cursor-pointer
              transition-all
              duration-300
              hover:bg-[#BF6952]/10
              focus:outline-none
            "

            aria-expanded={showUserMenu}

            aria-label="User menu"

          >

            <img

              className="
                w-9
                h-9
                rounded-full
                object-cover
                border-2
                border-[#BF6952]/25
              "

              src={userData.image}

              alt="User"

            />

            <img

              className={`
                w-2.5
                transition-transform
                duration-300
                ${
                  showUserMenu
                    ? "rotate-180"
                    : ""
                }
              `}

              src={assets.dropdown_icon}

              alt=""

            />

          </button>


          {/* User Dropdown */}

          <AnimatePresence>

            {showUserMenu && (

              <motion.div

                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.96
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1
                }}

                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.96
                }}

                transition={{
                  duration: 0.2
                }}

                className="
                  absolute
                  right-0
                  mt-3
                  z-50
                "

              >

                <div

                  className="
                    min-w-52
                    p-2
                    rounded-2xl
                    bg-white
                    border
                    border-gray-100
                    shadow-xl
                    flex
                    flex-col
                    gap-1
                  "

                >

                  <p

                    onClick={() => {

                      setShowUserMenu(false)

                      navigate('/my-profile')

                    }}

                    className="
                      px-4
                      py-3
                      rounded-xl
                      text-gray-600
                      cursor-pointer
                      transition-all
                      hover:bg-[#BF6952]/10
                      hover:text-[#BF6952]
                    "

                  >

                    My Profile

                  </p>


                  <p

                    onClick={() => {

                      setShowUserMenu(false)

                      navigate('/my-appointments')

                    }}

                    className="
                      px-4
                      py-3
                      rounded-xl
                      text-gray-600
                      cursor-pointer
                      transition-all
                      hover:bg-[#BF6952]/10
                      hover:text-[#BF6952]
                    "

                  >

                    My Appointments

                  </p>


                  <p

                    onClick={() => {

                      setShowUserMenu(false)

                      logout()

                    }}

                    className="
                      px-4
                      py-3
                      rounded-xl
                      text-red-500
                      cursor-pointer
                      transition-all
                      hover:bg-red-50
                    "

                  >

                    Logout

                  </p>

                </div>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      ) : (

        <button

          onClick={() => navigate('/login')}

          className="
            hidden
            md:block
            bg-[#BF6952]
            text-white
            px-7
            py-3
            rounded-full
            font-medium
            shadow-md
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-lg
            active:scale-95
          "

        >

          Create account

        </button>

      )}


      {/* Mobile Menu Icon */}

      <img

        onClick={() => setShowMenu(true)}

        className="
          w-7
          md:hidden
          cursor-pointer
          transition-transform
          duration-300
          hover:scale-110
        "

        src={assets.menu_icon}

        alt="Menu"

      />

    </div>

  </motion.header>


  {/* ---------------- Mobile Menu ---------------- */}

  <AnimatePresence>

    {showMenu && (

      <>

        {/* Backdrop */}

        <motion.div

          initial={{
            opacity: 0
          }}

          animate={{
            opacity: 0.45
          }}

          exit={{
            opacity: 0
          }}

          onClick={() => setShowMenu(false)}

          className="
            fixed
            inset-0
            bg-black
            z-40
          "

        />


        {/* Drawer */}

        <motion.div

          initial={{
            x: "100%"
          }}

          animate={{
            x: 0
          }}

          exit={{
            x: "100%"
          }}

          transition={{
            duration: 0.35,
            ease: "easeOut"
          }}

          className="
            fixed
            top-0
            right-0
            bottom-0
            w-full
            max-w-sm
            bg-white
            z-50
            rounded-l-3xl
            shadow-2xl
          "

        >

          {/* Mobile Header */}

          <div

            className="
              flex
              items-center
              justify-between
              px-6
              py-6
              border-b
              border-gray-100
            "

          >

            <img

              src={assets.logo}

              className='w-36'

              alt="Logo"

            />


            <img

              onClick={() => {
                setShowMenu(false)
              }}

              src={assets.cross_icon}

              className="
                w-7
                cursor-pointer
                transition-transform
                duration-300
                hover:rotate-90
              "

              alt="Close"

            />

          </div>


          {/* Mobile Links */}

          <ul

            className="
              flex
              flex-col
              gap-3
              mt-5
              px-6
              text-base
              font-semibold
            "

          >

            <NavLink

              onClick={() => {
                setShowMenu(false)
              }}

              to='/'

              className='w-full'

            >

              {({ isActive }) => (

                <p

                  className={`
                    px-5
                    py-4
                    rounded-xl
                    text-center
                    transition-all
                    ${
                      isActive
                        ? "bg-[#BF6952] text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-[#BF6952]/10"
                    }
                  `}

                >

                  HOME

                </p>

              )}

            </NavLink>


            <NavLink

              onClick={() => {
                setShowMenu(false)
              }}

              to='/doctors'

              className='w-full'

            >

              {({ isActive }) => (

                <p

                  className={`
                    px-5
                    py-4
                    rounded-xl
                    text-center
                    transition-all
                    ${
                      isActive
                        ? "bg-[#BF6952] text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-[#BF6952]/10"
                    }
                  `}

                >

                  ALL DOCTORS

                </p>

              )}

            </NavLink>


            <NavLink

              onClick={() => {
                setShowMenu(false)
              }}

              to='/about'

              className='w-full'

            >

              {({ isActive }) => (

                <p

                  className={`
                    px-5
                    py-4
                    rounded-xl
                    text-center
                    transition-all
                    ${
                      isActive
                        ? "bg-[#BF6952] text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-[#BF6952]/10"
                    }
                  `}

                >

                  ABOUT

                </p>

              )}

            </NavLink>


            <NavLink

              onClick={() => {
                setShowMenu(false)
              }}

              to='/contact'

              className='w-full'

            >

              {({ isActive }) => (

                <p

                  className={`
                    px-5
                    py-4
                    rounded-xl
                    text-center
                    transition-all
                    ${
                      isActive
                        ? "bg-[#BF6952] text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-[#BF6952]/10"
                    }
                  `}

                >

                  CONTACT

                </p>

              )}

            </NavLink>

          </ul>

        </motion.div>

      </>

    )}

  </AnimatePresence>

</>
  )
}

export default Navbar