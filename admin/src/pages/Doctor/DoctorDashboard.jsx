import 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

const {
dToken,
dashData,
getDashData,
cancelAppointment,
completeAppointment
} = useContext(DoctorContext)

const {
slotDateFormat,
currency
} = useContext(AppContext)

useEffect(() => {

if (dToken) {
  getDashData()
}

}, [dToken, getDashData])

return dashData && (
<div className='m-4 w-full max-w-6xl sm:m-5'>

  <div className='mb-6'>

    <p className='text-xl font-semibold text-gray-800'>
      Doctor Dashboard
    </p>

    <p className='mt-1 text-sm text-gray-500'>
      Overview of your earnings, appointments, and patients.
    </p>

  </div>

  <div className='flex flex-wrap gap-4'>

    <div className='group flex min-w-52 flex-1 items-center gap-4 rounded-2xl border border-primary/25 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md'>

      <div className='rounded-xl bg-primary/10 p-3 transition-transform duration-300 group-hover:scale-110'>

        <img
          className='w-12'
          src={assets.earning_icon}
          alt=""
        />

      </div>

      <div>

        <p className='text-2xl font-bold text-gray-800'>
          {currency} {dashData.earnings}
        </p>

        <p className='mt-1 text-sm text-gray-500'>
          Earnings
        </p>

      </div>

    </div>

    <div className='group flex min-w-52 flex-1 items-center gap-4 rounded-2xl border border-primary/25 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md'>

      <div className='rounded-xl bg-primary/10 p-3 transition-transform duration-300 group-hover:scale-110'>

        <img
          className='w-12'
          src={assets.appointments_icon}
          alt=""
        />

      </div>

      <div>

        <p className='text-2xl font-bold text-gray-800'>
          {dashData.appointments}
        </p>

        <p className='mt-1 text-sm text-gray-500'>
          Appointments
        </p>

      </div>

    </div>

    <div className='group flex min-w-52 flex-1 items-center gap-4 rounded-2xl border border-primary/25 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md'>

      <div className='rounded-xl bg-primary/10 p-3 transition-transform duration-300 group-hover:scale-110'>

        <img
          className='w-12'
          src={assets.patients_icon}
          alt=""
        />

      </div>

      <div>

        <p className='text-2xl font-bold text-gray-800'>
          {dashData.patients}
        </p>

        <p className='mt-1 text-sm text-gray-500'>
          Patients
        </p>

      </div>

    </div>

  </div>

  <div className='mt-8 overflow-hidden rounded-2xl border border-primary/25 bg-white shadow-sm'>

    <div className='flex items-center gap-3 border-b border-primary/25 bg-primary/10 px-5 py-4'>

      <div className='rounded-lg bg-primary/10 p-2'>

        <img
          className='w-5'
          src={assets.list_icon}
          alt=""
        />

      </div>

      <div>

        <p className='font-semibold text-gray-800'>
          Latest Bookings
        </p>

        <p className='text-xs text-gray-500'>
          Your most recent patient appointments
        </p>

      </div>

    </div>

    <div className='divide-y divide-primary/25'>

      {dashData.latestAppointments.slice(0, 5).map((item, index) => (

        <div
          className='flex items-center gap-3 px-5 py-4 transition-all duration-300 hover:bg-primary/5'
          key={index}
        >

          <img
            className='h-11 w-11 rounded-full border-2 border-white bg-gray-100 object-cover shadow-sm'
            src={item.userData.image}
            alt=""
          />

          <div className='flex-1 text-sm'>

            <p className='font-semibold text-gray-800'>
              {item.userData.name}
            </p>

            <p className='mt-1 text-xs text-gray-500'>
              Booking on {slotDateFormat(item.slotDate)}
            </p>

          </div>

          {item.cancelled ? (

            <p className='rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-500'>
              Cancelled
            </p>

          ) : item.isCompleted ? (

            <p className='rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-600'>
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

export default DoctorDashboard