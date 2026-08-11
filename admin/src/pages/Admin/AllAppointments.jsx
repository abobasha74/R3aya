import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { useEffect } from "react";

const AllAppointments = () => {

const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

useEffect(() => {
if (aToken) {
getAllAppointments()
}
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [aToken])

return (
<div className='m-4 w-full max-w-6xl sm:m-5'>

  <div className='mb-5'>
    <p className='text-xl font-semibold text-gray-800'>
      All Appointments
    </p>

    <p className='mt-1 text-sm text-gray-500'>
      Manage and track all patient appointments.
    </p>
  </div>

  <div className='max-h-[80vh] overflow-y-auto rounded-2xl border border-primary/25 bg-white text-sm shadow-sm'>

    <div className='sticky top-0 z-10 hidden grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] border-b border-primary/25 bg-primary/10 px-6 py-4 sm:grid'>

      <p className='font-semibold text-gray-700'>
        #
      </p>

      <p className='font-semibold text-gray-700'>
        Patient
      </p>

      <p className='font-semibold text-gray-700'>
        Age
      </p>

      <p className='font-semibold text-gray-700'>
        Date & Time
      </p>

      <p className='font-semibold text-gray-700'>
        Doctor
      </p>

      <p className='font-semibold text-gray-700'>
        Fees
      </p>

      <p className='font-semibold text-gray-700'>
        Action
      </p>

    </div>

    {appointments.map((item, index) => (

      <div
        className='flex flex-wrap items-center justify-between gap-3 border-b border-primary/25 px-4 py-4 text-gray-600 transition-all duration-300 hover:bg-primary/5 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] sm:gap-0 sm:px-6'
        key={index}
      >

        <p className='hidden text-gray-500 sm:block'>
          {index + 1}
        </p>

        <div className='flex min-w-[150px] items-center gap-3'>

          <img
            src={item.userData.image}
            className='h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm'
            alt=""
          />

          <p className='font-medium text-gray-700'>
            {item.userData.name}
          </p>

        </div>

        <p className='hidden sm:block'>
          {calculateAge(item.userData.dob)}
        </p>

        <p className='min-w-[150px]'>
          {slotDateFormat(item.slotDate)}, {item.slotTime}
        </p>

        <div className='flex min-w-[150px] items-center gap-3'>

          <img
            src={item.docData.image}
            className='h-9 w-9 rounded-full border-2 border-white bg-gray-100 object-cover shadow-sm'
            alt=""
          />

          <p className='font-medium text-gray-700'>
            {item.docData.name}
          </p>

        </div>

        <p className='font-semibold text-primary'>
          {currency}{item.amount}
        </p>

        {item.cancelled ? (

          <p className='flex w-fit items-center justify-center rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-500'>
            Cancelled
          </p>

        ) : item.isCompleted ? (

          <p className='flex w-fit items-center justify-center rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-600'>
            Completed
          </p>

        ) : (

          <img
            onClick={() => cancelAppointment(item._id)}
            className='w-10 cursor-pointer rounded-full transition-all duration-300 hover:scale-110 hover:bg-red-50 active:scale-95'
            src={assets.cancel_icon}
            alt=""
          />

        )}

      </div>

    ))}

  </div>

</div>
  )
}

export default AllAppointments