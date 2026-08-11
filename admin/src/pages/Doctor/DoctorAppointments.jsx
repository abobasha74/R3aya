/* eslint-disable react-hooks/exhaustive-deps */
import 'react'
import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

const {
dToken,
appointments,
getAppointments,
cancelAppointment,
completeAppointment
} = useContext(DoctorContext)

const {
slotDateFormat,
calculateAge,
currency
} = useContext(AppContext)

useEffect(() => {
if (dToken) {
getAppointments()
}
}, [dToken])

return (
<div className='m-4 w-full max-w-6xl sm:m-5'>

  <div className='mb-6'>
    <p className='text-xl font-semibold text-gray-800'>
      All Appointments
    </p>

    <p className='mt-1 text-sm text-gray-500'>
      View and manage your patient appointments.
    </p>
  </div>

  <div className='max-h-[80vh] overflow-hidden rounded-2xl border border-primary/25 bg-white shadow-sm'>

    <div className='max-h-[80vh] overflow-y-auto'>

      <div className='hidden grid-cols-[0.5fr_2fr_1.2fr_0.8fr_2.5fr_1fr_1.2fr] items-center gap-2 border-b border-primary/25 bg-gray-100 px-6 py-4 text-sm sm:grid'>

        <p className='font-semibold text-gray-700'>
          #
        </p>

        <p className='font-semibold text-gray-700'>
          Patient
        </p>

        <p className='font-semibold text-gray-700'>
          Payment
        </p>

        <p className='font-semibold text-gray-700'>
          Age
        </p>

        <p className='font-semibold text-gray-700'>
          Date & Time
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
          className='flex flex-wrap items-center justify-between gap-4 border-b border-primary/25 px-5 py-4 text-sm transition-all duration-300 hover:bg-primary/5 sm:grid sm:grid-cols-[0.5fr_2fr_1.2fr_0.8fr_2.5fr_1fr_1.2fr] sm:gap-2 sm:px-6'
          key={index}
        >

          <p className='hidden font-medium text-gray-500 sm:block'>
            {index + 1}
          </p>

          <div className='flex min-w-[150px] items-center gap-3'>

            <img
              src={item.userData.image}
              className='h-10 w-10 rounded-full border-2 border-primary/25 bg-gray-100 object-cover shadow-sm'
              alt=""
            />

            <p className='truncate font-medium text-gray-800'>
              {item.userData.name}
            </p>

          </div>

          <div>

            <p className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
              item.payment
                ? 'border-blue-200 bg-blue-50 text-blue-600'
                : 'border-amber-200 bg-amber-50 text-amber-600'
            }`}>

              {item.payment ? 'ONLINE' : 'CASH'}

            </p>

          </div>

          <p className='hidden font-medium text-gray-600 sm:block'>
            {calculateAge(item.userData.dob)}
          </p>

          <p className='min-w-[190px] text-gray-600'>
            {slotDateFormat(item.slotDate)}, {item.slotTime}
          </p>

          <p className='font-semibold text-gray-700'>
            {currency}{item.amount}
          </p>

          {item.cancelled ? (

            <p className='inline-flex justify-center rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-500'>
              Cancelled
            </p>

          ) : item.isCompleted ? (

            <p className='inline-flex justify-center rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-600'>
              Completed
            </p>

          ) : (

            <div className='flex items-center gap-1'>

              <button
                onClick={() => cancelAppointment(item._id)}
                className='rounded-full p-1 transition-all duration-300 hover:scale-110 hover:bg-red-50 active:scale-95'
                title='Cancel appointment'
              >

                <img
                  className='w-9 cursor-pointer'
                  src={assets.cancel_icon}
                  alt=""
                />

              </button>

              <button
                onClick={() => completeAppointment(item._id)}
                className='rounded-full p-1 transition-all duration-300 hover:scale-110 hover:bg-green-50 active:scale-95'
                title='Complete appointment'
              >

                <img
                  className='w-9 cursor-pointer'
                  src={assets.tick_icon}
                  alt=""
                />

              </button>

            </div>

          )}

        </div>

      ))}

    </div>

  </div>

</div>
  )
}

export default DoctorAppointments