import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useContext } from "react";

const Sidebar = () => {

const { dToken } = useContext(DoctorContext)
const { aToken } = useContext(AdminContext)

return (
<div className='min-h-screen bg-[#E2D9D6]/30 border-r border-[#312D2D]/25 shadow-sm'>

  {aToken && (
    <ul className='mt-5 space-y-1 text-[#515151]'>

      <NavLink
        to={'/admin-dashboard'}
        className={({ isActive }) =>
          `group flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer border-r-4 transition-all duration-300 ${
            isActive
              ? 'bg-primary/25 border-primary text-primary font-semibold'
              : 'border-transparent hover:bg-gray-50 hover:text-primary hover:font-semibold'
          }`
        }
      >
        <img
          className='min-w-5 transition-transform duration-300 group-hover:scale-110'
          src={assets.home_icon}
          alt=''
        />
        <p className='hidden md:block'>Dashboard</p>
      </NavLink>

      <NavLink
        to={'/all-appointments'}
        className={({ isActive }) =>
          `group flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer border-r-4 transition-all duration-300 ${
            isActive
              ? 'bg-primary/25 border-primary text-primary font-semibold'
              : 'border-transparent hover:bg-gray-50 hover:text-primary hover:font-semibold'
          }`
        }
      >
        <img
          className='min-w-5 transition-transform duration-300 group-hover:scale-110'
          src={assets.appointment_icon}
          alt=''
        />
        <p className='hidden md:block'>Appointments</p>
      </NavLink>

      <NavLink
        to={'/add-doctor'}
        className={({ isActive }) =>
          `group flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer border-r-4 transition-all duration-300 ${
            isActive
              ? 'bg-primary/25 border-primary text-primary font-semibold'
              : 'border-transparent hover:bg-gray-50 hover:text-primary hover:font-semibold'
          }`
        }
      >
        <img
          className='min-w-5 transition-transform duration-300 group-hover:scale-110'
          src={assets.add_icon}
          alt=''
        />
        <p className='hidden md:block'>Add Doctor</p>
      </NavLink>

      <NavLink
        to={'/doctor-list'}
        className={({ isActive }) =>
          `group flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer border-r-4 transition-all duration-300 ${
            isActive
              ? 'bg-primary/25 border-primary text-primary font-semibold'
              : 'border-transparent hover:bg-gray-50 hover:text-primary hover:font-semibold'
          }`
        }
      >
        <img
          className='min-w-5 transition-transform duration-300 group-hover:scale-110'
          src={assets.people_icon}
          alt=''
        />
        <p className='hidden md:block'>Doctors List</p>
      </NavLink>

    </ul>
  )}

  {dToken && (
    <ul className='mt-5 space-y-1 text-[#515151]'>

      <NavLink
        to={'/doctor-dashboard'}
        className={({ isActive }) =>
          `group flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer border-r-4 transition-all duration-300 ${
            isActive
              ?'bg-primary/25 border-primary text-primary font-semibold'
              : 'border-transparent hover:bg-gray-50 hover:text-primary hover:font-semibold'
          }`
        }
      >
        <img
          className='min-w-5 transition-transform duration-300 group-hover:scale-110'
          src={assets.home_icon}
          alt=''
        />
        <p className='hidden md:block'>Dashboard</p>
      </NavLink>

      <NavLink
        to={'/doctor-appointments'}
        className={({ isActive }) =>
          `group flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer border-r-4 transition-all duration-300 ${
            isActive
              ? 'bg-primary/25 border-primary text-primary font-semibold'
              : 'border-transparent hover:bg-gray-50 hover:text-primary hover:font-semibold'
          }`
        }
      >
        <img
          className='min-w-5 transition-transform duration-300 group-hover:scale-110'
          src={assets.appointment_icon}
          alt=''
        />
        <p className='hidden md:block'>Appointments</p>
      </NavLink>

      <NavLink
        to={'/doctor-profile'}
        className={({ isActive }) =>
          `group flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer border-r-4 transition-all duration-300 ${
            isActive
              ? 'bg-primary/25 border-primary text-primary font-semibold'
              : 'border-transparent hover:bg-gray-50 hover:text-primary hover:font-semibold'
          }`
        }
      >
        <img
          className='min-w-5 transition-transform duration-300 group-hover:scale-110'
          src={assets.people_icon}
          alt=''
        />
        <p className='hidden md:block'>Profile</p>
      </NavLink>

    </ul>
  )}

</div>
  )
}

export default Sidebar