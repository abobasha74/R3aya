import { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { showUpdate, showError } from '../../utils/toastSound'
import axios from 'axios'

const DoctorProfile = () => {

const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
const { currency, backendUrl } = useContext(AppContext)
const [isEdit, setIsEdit] = useState(false)

const updateProfile = async () => {

    try {

        const updateData = {
            address: profileData.address,
            fees: profileData.fees,
            about: profileData.about,
            available: profileData.available
        }

        const { data } = await axios.post(
            backendUrl + '/api/doctor/update-profile',
            updateData,
            { headers: { dToken } }
        )

        if (data.success) {
            showUpdate(data.message)
            setIsEdit(false)
            getProfileData()
        } else {
            showError(data.message)
        }

        setIsEdit(false)

    } catch (error) {
        showError(error.message)
        console.log(error)
    }

}

useEffect(() => {
    if (dToken) {
        getProfileData()
    }
}, [dToken, getProfileData])

return profileData && (
    <div className='m-4 w-full max-w-6xl sm:m-5'>

        <div className='mb-6'>

            <p className='text-xl font-semibold text-gray-800'>
                Doctor Profile
            </p>

            <p className='mt-1 text-sm text-gray-500'>
                View and manage your professional information.
            </p>

        </div>

        <div className='overflow-hidden rounded-2xl border border-primary/25 bg-white shadow-sm'>

            <div className='flex flex-col lg:flex-row'>

                <div className='flex flex-col items-center justify-center border-b border-primary/25 bg-primary/10 p-7 lg:w-80 lg:border-b-0 lg:border-r'>

                    <div className='relative'>

                        <img
                            className='h-48 w-48 rounded-2xl border-4 border-primary/25 bg-gray-100 object-cover shadow-md'
                            src={profileData.image}
                            alt=""
                        />

                        <div className={`absolute -bottom-2 -right-2 rounded-full border-4 border-primary/25 px-3 py-1 text-xs font-medium shadow-sm ${
                            profileData.available
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-400 text-white'
                        }`}>

                            {profileData.available ? 'Available' : 'Unavailable'}

                        </div>

                    </div>

                    <p className='mt-6 text-center text-xl font-semibold text-gray-800'>
                        {profileData.name}
                    </p>

                    <p className='mt-1 text-center text-sm text-gray-500'>
                        {profileData.speciality}
                    </p>

                    <span className='mt-3 rounded-full border border-primary/20 bg-white px-4 py-1 text-xs font-medium text-primary'>
                        {profileData.experience}
                    </span>

                </div>

                <div className='flex-1 p-6 sm:p-8'>

                    <div className='flex flex-col gap-2 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between'>

                        <div>

                            <p className='text-2xl font-semibold text-gray-800'>
                                {profileData.name}
                            </p>

                            <p className='mt-1 text-sm text-gray-500'>
                                {profileData.degree} · {profileData.speciality}
                            </p>

                        </div>

                        <span className='w-fit rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary'>
                            {profileData.experience}
                        </span>

                    </div>

                    <div className='mt-6'>

                        <p className='text-sm font-semibold text-gray-800'>
                            About Doctor
                        </p>

                        {isEdit ? (

                            <textarea
                                onChange={(e) =>
                                    setProfileData(prev => ({
                                        ...prev,
                                        about: e.target.value
                                    }))
                                }
                                className='mt-3 w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10'
                                rows={7}
                                value={profileData.about}
                            />

                        ) : (

                            <p className='mt-3 max-w-[750px] leading-7 text-sm text-gray-600'>
                                {profileData.about}
                            </p>

                        )}

                    </div>

                    <div className='mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2'>

                        <div className='rounded-xl border border-primary/25 bg-gray-50 p-4'>

                            <p className='text-xs font-medium uppercase tracking-wide text-gray-400'>
                                Appointment Fee
                            </p>

                            <div className='mt-2 flex items-center gap-2'>

                                <span className='text-lg font-semibold text-gray-800'>
                                    {currency}
                                </span>

                                {isEdit ? (

                                    <input
                                        type='number'
                                        min='0'
                                        onChange={(e) =>
                                            setProfileData(prev => ({
                                                ...prev,
                                                fees: e.target.value
                                            }))
                                        }
                                        value={profileData.fees}
                                        className='w-full rounded-lg border border-primary/25 bg-white px-3 py-2 text-sm font-medium text-gray-800 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10'
                                    />

                                ) : (

                                    <span className='text-lg font-semibold text-gray-800'>
                                        {profileData.fees}
                                    </span>

                                )}

                            </div>

                        </div>

                        <div className='rounded-xl border border-primary/25 bg-gray-50 p-4'>

                            <p className='text-xs font-medium uppercase tracking-wide text-gray-400'>
                                Availability
                            </p>

                            <div className='mt-3 flex items-center gap-3'>

                                <label className='relative inline-flex cursor-pointer items-center'>

                                    <input
    type="checkbox"
    onChange={(e) =>
        setProfileData(prev => ({
            ...prev,
            available: e.target.checked
        }))
    }
    checked={profileData.available}
    className='peer sr-only'
/>

                                    <div className='h-6 w-11 rounded-full bg-gray-200 transition-all peer-checked:bg-primary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full'>
                                    </div>

                                </label>

                                <p className='text-sm font-medium text-gray-700'>
                                    {profileData.available
                                        ? 'Available for appointments'
                                        : 'Currently unavailable'}
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className='mt-5 rounded-xl border border-primary/25 bg-gray-50 p-4'>

                        <p className='text-xs font-medium uppercase tracking-wide text-gray-400'>
                            Address
                        </p>

                        <div className='mt-3 text-sm leading-6 text-gray-600'>

                            {isEdit ? (

                                <div className='flex flex-col gap-3'>

                                    <input
    type='text'
    onChange={(e) =>
        setProfileData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                line1: e.target.value
            }
        }))
    }
    value={profileData.address.line1}
    className='rounded-lg border border-primary/25 bg-white px-3 py-2 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10'
/>

                                    <input
                                        type='text'
                                        onChange={(e) =>
                                            setProfileData(prev => ({
                                                ...prev,
                                                address: {
                                                    ...prev.address,
                                                    line2: e.target.value
                                                }
                                            }))
                                        }
                                        value={profileData.address.line2}
                                        className='rounded-lg border border-primary/25 bg-white px-3 py-2 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10'
                                    />

                                </div>

                            ) : (

                                <>
                                    <p>{profileData.address.line1}</p>
                                    <p>{profileData.address.line2}</p>
                                </>

                            )}

                        </div>

                    </div>

                    <div className='mt-7 flex items-center gap-3'>

                        {isEdit ? (

                            <button
                                onClick={updateProfile}
                                className='rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md active:scale-95'
                            >
                                Save Changes
                            </button>

                        ) : (

                            <button
                                onClick={() => setIsEdit(prev => !prev)}
                                className='rounded-xl border border-primary px-6 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-white'
                            >
                                Edit Profile
                            </button>

                        )}

                    </div>

                </div>

            </div>

        </div>

    </div>
    )
}

export default DoctorProfile