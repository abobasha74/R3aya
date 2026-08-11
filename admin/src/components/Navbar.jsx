import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

const Navbar = () => {

const { dToken, setDToken } = useContext(DoctorContext)
const { aToken, setAToken } = useContext(AdminContext)

const navigate = useNavigate()

const logout = () => {
navigate('/')

dToken && setDToken('')
dToken && localStorage.removeItem('dToken')

aToken && setAToken('')
aToken && localStorage.removeItem('aToken')

}

return (
<div className="sticky top-0 z-50 flex items-center justify-between border-b border-primary/50 bg-white px-4 py-3 shadow-sm sm:px-10">

  <div className="flex items-center gap-3 text-xs">

    <img
      onClick={() => navigate('/')}
      className="w-36 cursor-pointer transition-all duration-300 hover:scale-105 sm:w-40"
      src={assets.admin_logo}
      alt="Admin Logo"
    />

    <p className="rounded-full border border-primary/ bg-primary/5 px-3 py-1 font-semibold text-primary shadow-sm transition-all duration-300 hover:bg-primary hover:text-white">
      {aToken ? 'Admin' : 'Doctor'}
    </p>

  </div>

  <button
    onClick={logout}
    className="rounded-full bg-primary px-7 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95 sm:px-10"
  >
    Logout
  </button>

</div>
  )
}

export default Navbar