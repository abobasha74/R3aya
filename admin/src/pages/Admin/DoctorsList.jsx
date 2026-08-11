import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

useEffect(() => {
if (aToken) {
getAllDoctors()
}
}, [aToken, getAllDoctors])

return (
<div className='m-4 w-full max-w-6xl sm:m-5'>

  <div className='mb-6'>
    <h1 className='text-xl font-semibold text-gray-800'>
      All Doctors
    </h1>

    <p className='mt-1 text-sm text-gray-500'>
      Manage doctors and update their availability.
    </p>
  </div>

  <div className='max-h-[80vh] overflow-y-auto pr-2'>

    <div className='grid grid-cols-1 gap-5 pb-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

      {doctors.map((item, index) => (

        <div
          className='group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
          key={index}
        >

          <div className='relative overflow-hidden bg-primary/15 transition-all duration-300 group-hover:scale-105'>

            <img
              className='h-56 w-full object-cover transition-all duration-500 group-hover:scale-105'
              src={item.image}
              alt=""
            />

            <div className='absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur-sm'>
              {item.available ? 'Available' : 'Unavailable'}
            </div>

          </div>

          <div className='p-5'>

            <p className='truncate text-lg font-semibold text-gray-800'>
              {item.name}
            </p>

            <p className='mt-1 text-sm text-gray-500'>
              {item.speciality}
            </p>

            <div className='mt-5 flex items-center justify-between border-t border-gray-100 pt-4'>

              <p className='text-sm font-medium text-gray-600'>
                Availability
              </p>

              <label className='relative inline-flex cursor-pointer items-center'>

                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  className='peer sr-only'
                />

                <div className='h-6 w-11 rounded-full bg-gray-200 transition-all duration-300 peer-checked:bg-primary peer-focus:ring-4 peer-focus:ring-primary/10 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:duration-300 peer-checked:after:translate-x-full peer-checked:after:border-white'>
                </div>

              </label>

            </div>

          </div>

        </div>

      ))}

    </div>

  </div>

</div>
  )
}

export default DoctorsList