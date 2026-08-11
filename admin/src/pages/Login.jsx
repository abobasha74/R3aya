import axios from 'axios'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { showUpdate, showError, showSuccess } from "../utils/toastSound";
import { useState, useContext } from "react";

const Login = () => {

const [state, setState] = useState('Admin')

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const backendUrl = import.meta.env.VITE_BACKEND_URL

const { setDToken } = useContext(DoctorContext)
const { setAToken } = useContext(AdminContext)

const onSubmitHandler = async (event) => {
event.preventDefault();

if (state === 'Admin') {

  const { data } = await axios.post(
    backendUrl + '/api/admin/login',
    { email, password }
  )

  if (data.success) {
    setAToken(data.token)
    localStorage.setItem('aToken', data.token)
    showUpdate("Login Successfully")
  } else {
  showError(data.message)
  }

} else {

  const { data } = await axios.post(
    backendUrl + '/api/doctor/login',
    { email, password }
  )

  if (data.success) {
    setDToken(data.token)
    localStorage.setItem('dToken', data.token)
    showSuccess("Login Successfully")

  } else {
  showError(data.message)
  }

}

}

return (
<form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center' >

  <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>

    <p className='text-2xl m-auto font-semibold'>
      <span className='text-primary'>{state}</span>
      Login
    </p>

    <div className='w-full'>
      <p>Email</p>

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className='border border-[#DADADA] rounded w-full p-2 mt-1 outline-indigo-700'
        placeholder='Email'
        type="email"
        required
      />
    </div>

    <div className='w-full'>
      <p>Password</p>

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className='border border-[#DADADA] rounded w-full p-2 mt-1 outline-indigo-700'
        placeholder='Password'
        type="password"
        required
      />
    </div>

    <button
      type='submit'
      className='bg-primary text-white w-full py-2 rounded-md text-base mt-6'
    >
      Login
    </button>

    {
      state === 'Admin'
        ? (
          <p>
            Doctor Login?
            <span
              onClick={() => setState('Doctor')}
              className='text-primary underline cursor-pointer'
            >
              Click here
            </span>
          </p>
        )
        : (
          <p>
            Admin Login?
            <span
              onClick={() => setState('Admin')}
              className='text-primary underline cursor-pointer'
            >
              Click here
            </span>
          </p>
        )
    }

  </div>

</form>
  )
}

export default Login