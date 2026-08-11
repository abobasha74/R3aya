import { assets } from '../../assets/assets'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { useState } from "react";
import { useContext } from "react";
import { showSuccess, showError } from '../../utils/toastSound'
const AddDoctor = () => {

const [docImg, setDocImg] = useState(false)
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [experience, setExperience] = useState('1 Year')
const [fees, setFees] = useState('')
const [about, setAbout] = useState('')
const [speciality, setSpeciality] = useState('General physician')
const [degree, setDegree] = useState('')
const [address1, setAddress1] = useState('')
const [address2, setAddress2] = useState('')

const { backendUrl } = useContext(AppContext)
const { aToken } = useContext(AdminContext)

const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

        if (!docImg) {
            return showError('Image Not Selected')
        }

        const formData = new FormData();

        formData.append('image', docImg)
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('experience', experience)
        formData.append('fees', Number(fees))
        formData.append('about', about)
        formData.append('speciality', speciality)
        formData.append('degree', degree)
        formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

        // console log formdata            
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        const { data } = await axios.post(
            backendUrl + '/api/admin/add-doctor',
            formData,
            { headers: { aToken } }
        )

        if (data.success) {
            showSuccess(data.message)
            setDocImg(false)
            setName('')
            setPassword('')
            setEmail('')
            setAddress1('')
            setAddress2('')
            setDegree('')
            setAbout('')
            setFees('')
        } else {
            showError(data.message)
        }

    } catch (error) {
        showError(error.message)
        console.log(error)
    }

}

return (
    <form
        onSubmit={onSubmitHandler}
        className='m-4 sm:m-5 w-full'
    >

        <div className='mb-5'>
            <p className='text-xl font-semibold text-gray-800'>
                Add Doctor
            </p>

            <p className='mt-1 text-sm text-gray-500'>
                Add a new doctor and complete their professional information.
            </p>
        </div>

        <div className='w-full max-w-5xl max-h-[80vh] overflow-y-auto rounded-2xl border border-[#312D2D]/25 bg-[#E2D9D6]/30 p-5 shadow-sm sm:p-8'>

            <div className='mb-8 flex items-center gap-4 rounded-xl border border-dashed border-primary bg-primary/5 p-4 text-gray-600'>

                <label
                    htmlFor="doc-img"
                    className='group cursor-pointer'
                >
                    <img
                        className='h-20 w-20 rounded-full border-4 border-white bg-gray-100 object-cover shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg'
                        src={
                            docImg
                                ? URL.createObjectURL(docImg)
                                : assets.upload_area
                        }
                        alt=""
                    />
                </label>

                <input
                    onChange={(e) => setDocImg(e.target.files[0])}
                    type="file"
                    name=""
                    id="doc-img"
                    hidden
                />

                <div>
                    <p className='font-semibold text-primary'>
                        Upload doctor picture
                    </p>

                    <p className='mt-1 text-xs text-primary/80'>
                        Click the image to choose a photo
                    </p>
                </div>

            </div>

            <div className='flex flex-col items-start gap-8 text-gray-600 lg:flex-row lg:gap-10'>

                <div className='flex w-full flex-col gap-5 lg:flex-1'>

                    <div className='flex flex-1 flex-col gap-1.5'>
                        <p className='text-sm font-medium'>
                            Your name
                        </p>

                        <input
                            onChange={e => setName(e.target.value)}
                            value={name}
                            className='rounded-lg border border-primary/25 bg-gray-50 px-4 py-2.5 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10'
                            type="text"
                            placeholder='Name'
                            required
                        />
                    </div>

                    <div className='flex flex-1 flex-col gap-1.5'>
                        <p className='text-sm font-medium'>
                            Doctor Email
                        </p>

                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className='rounded-lg border border-primary/25 bg-gray-50 px-4 py-2.5 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10'
                            type="email"
                            placeholder='Email'
                            required
                        />
                    </div>

                    <div className='flex flex-1 flex-col gap-1.5'>
                        <p className='text-sm font-medium'>
                            Set Password
                        </p>

                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            className='rounded-lg border border-primary/25 bg-gray-50 px-4 py-2.5 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10'
                            type="password"
                            placeholder='Password'
                            required
                        />
                    </div>

                    <div className='flex flex-1 flex-col gap-1.5'>
                        <p className='text-sm font-medium'>
                            Experience
                        </p>

                        <select
                            onChange={e => setExperience(e.target.value)}
                            value={experience}
                            className='cursor-pointer rounded-lg border border-primary/25 bg-gray-50 px-4 py-2.5 outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10'
                        >
                            <option value="1 Year">1 Year</option>
                            <option value="2 Year">2 Years</option>
                            <option value="3 Year">3 Years</option>
                            <option value="4 Year">4 Years</option>
                            <option value="5 Year">5 Years</option>
                            <option value="6 Year">6 Years</option>
                            <option value="8 Year">8 Years</option>
                            <option value="9 Year">9 Years</option>
                            <option value="10 Year">10 Years</option>
                        </select>
                    </div>

                    <div className='flex flex-1 flex-col gap-1.5'>
                        <p className='text-sm font-medium'>
                            Fees
                        </p>

                        <input
                            onChange={e => setFees(e.target.value)}
                            value={fees}
                            className='rounded-lg border border-primary/25 bg-gray-50 px-4 py-2.5 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10'
                            type="number"
                            placeholder='Doctor fees'
                            required
                        />
                    </div>

                </div>

                <div className='flex w-full flex-col gap-5 lg:flex-1'>

                    <div className='flex flex-1 flex-col gap-1.5'>
                        <p className='text-sm font-medium'>
                            Speciality
                        </p>

                        <select
                            onChange={e => setSpeciality(e.target.value)}
                            value={speciality}
                            className='cursor-pointer rounded-lg border border-primary/25 bg-gray-50 px-4 py-2.5 outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10'
                        >
                            <option value="General physician">
                                General physician
                            </option>

                            <option value="Gynecologist">
                                Gynecologist
                            </option>

                            <option value="Dermatologist">
                                Dermatologist
                            </option>

                            <option value="Pediatricians">
                                Pediatricians
                            </option>

                            <option value="Neurologist">
                                Neurologist
                            </option>

                            <option value="Gastroenterologist">
                                Gastroenterologist
                            </option>
                        </select>
                    </div>

                    <div className='flex flex-1 flex-col gap-1.5'>
                        <p className='text-sm font-medium'>
                            Degree
                        </p>

                        <input
                            onChange={e => setDegree(e.target.value)}
                            value={degree}
                            className='rounded-lg border border-primary/25 bg-gray-50 px-4 py-2.5 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10'
                            type="text"
                            placeholder='Degree'
                            required
                        />
                    </div>

                    <div className='flex flex-1 flex-col gap-1.5'>
                        <p className='text-sm font-medium'>
                            Address
                        </p>

                        <input
                            onChange={e => setAddress1(e.target.value)}
                            value={address1}
                            className='rounded-lg border border-primary/25 bg-gray-50 px-4 py-2.5 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10'
                            type="text"
                            placeholder='Address 1'
                            required
                        />

                        <input
                            onChange={e => setAddress2(e.target.value)}
                            value={address2}
                            className='rounded-lg border border-primary/25 bg-gray-50 px-4 py-2.5 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10'
                            type="text"
                            placeholder='Address 2'
                            required
                        />
                    </div>

                </div>

            </div>

            <div className='mt-6'>
                <p className='mb-2 text-sm font-medium text-gray-600'>
                    About Doctor
                </p>

                <textarea
                    onChange={e => setAbout(e.target.value)}
                    value={about}
                    className='w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10'
                    rows={5}
                    placeholder='Write about doctor'
                />
            </div>

            <button
                type='submit'
                className='mt-6 rounded-full bg-primary px-10 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95'
            >
                Add doctor
            </button>

        </div>

    </form>
    )
}

export default AddDoctor