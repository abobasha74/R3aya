import 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

const navigate = useNavigate()

return (
    <section className='relative my-20 mx-4 md:mx-10 lg:mx-14'>

        <div className='
            relative
            overflow-hidden
            flex
            min-h-[330px]
            md:min-h-[390px]
            lg:min-h-[430px]
            bg-[#262626]
            rounded-3xl
            px-6
            sm:px-10
            md:px-14
            lg:px-16
            shadow-xl
        '>

            {/* Gradient Overlay */}
            <div className='
                absolute
                inset-0
                bg-gradient-to-r
                from-black/25
                via-[#262626]/80
                to-black/30
                pointer-events-none
            ' />

            {/* Soft Decorative Glow */}
            <div className='
                absolute
                -left-32
                top-1/2
                -translate-y-1/2
                w-80
                h-80
                rounded-full
                bg-[#BF6952]/15
                blur-3xl
                pointer-events-none
            ' />

            {/* Decorative Circle */}
            <div className='
                absolute
                right-20
                top-10
                w-36
                h-36
                rounded-full
                border
                border-white/10
                pointer-events-none
            ' />

            {/* ------- Left Side ------- */}
            <div className='
                relative
                z-10
                flex-1
                flex
                flex-col
                justify-center
                py-10
                md:py-14
                lg:py-16
                lg:pl-5
            '>

                <div className='
                    max-w-2xl
                    text-2xl
                    sm:text-3xl
                    md:text-4xl
                    lg:text-5xl
                    font-semibold
                    leading-tight
                    text-[#BF6952]
                '>

                    <p>
                        Book Appointment
                    </p>

                    <p className='mt-3 lg:mt-4'>
                        With 100+ Trusted Doctors
                    </p>

                </div>

                <button

                    onClick={() => {
                        navigate('/login')
                        scrollTo(0, 0)
                    }}

                    className='
                        w-fit
                        bg-[#BF6952]
                        text-sm
                        sm:text-base
                        font-medium
                        text-white
                        px-8
                        py-3.5
                        rounded-full
                        mt-7
                        shadow-lg
                        transition-all
                        duration-300
                        hover:scale-105
                        hover:shadow-xl
                        hover:bg-[#c97862]
                        focus:outline-none
                        focus:ring-2
                        focus:ring-white/70
                        active:scale-95
                    '

                >

                    Create account

                </button>

            </div>


            {/* ------- Right Side ------- */}

            <div className='
                hidden
                md:block
                md:w-1/2
                lg:w-[440px]
                relative
                z-10
            '>

                <img

                    className='
                        w-full
                        absolute
                        bottom-0
                        right-0
                        max-w-[480px]
                        select-none
                        transition-transform
                        duration-500
                        hover:scale-[1.02]
                    '

                    src={assets.appointment_img}

                    alt="Doctor"

                    draggable="false"

                />

            </div>

        </div>

    </section>

    )
}

export default Banner