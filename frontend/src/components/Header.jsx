import 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion";

const Header = () => {
return (
<section className="relative w-full py-4 md:py-6">

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className='
                relative
                flex
                flex-col
                md:flex-row
                overflow-hidden
                rounded-3xl
                bg-primary
                px-6
                sm:px-10
                md:px-12
                lg:px-20
                min-h-[520px]
                md:min-h-[560px]
                shadow-xl
            '
        >

            {/* Soft Background Decorations */}
            <div className='
                absolute
                -left-24
                top-1/2
                -translate-y-1/2
                w-80
                h-80
                rounded-full
                bg-white/5
                blur-3xl
                pointer-events-none
            ' />

            <div className='
                absolute
                -right-24
                -top-24
                w-80
                h-80
                rounded-full
                bg-[#BF6952]/20
                blur-3xl
                pointer-events-none
            ' />

            {/* --------- Header Left --------- */}
            <div className='
                relative
                z-10
                md:w-1/2
                flex
                flex-col
                items-start
                justify-center
                gap-6
                py-14
                md:py-16
                lg:py-20
            '>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.15,
                        duration: 0.5,
                        ease: "easeOut"
                    }}
                    className='
                        max-w-xl
                        text-4xl
                        sm:text-5xl
                        md:text-5xl
                        lg:text-6xl
                        text-white
                        font-bold
                        leading-[1.12]
                        tracking-tight
                    '
                >
                    Book Appointment
                    <br />
                    <span className='text-[#BF6952]'>
                        With Trusted Doctors
                    </span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.45,
                        ease: "easeOut"
                    }}
                    className='
                        flex
                        flex-col
                        sm:flex-row
                        items-start
                        sm:items-center
                        gap-4
                        max-w-xl
                        text-white/85
                        text-sm
                        sm:text-base
                        leading-relaxed
                    '
                >

                    <img
                        className='
                            w-28
                            shrink-0
                        '
                        src={assets.group_profiles}
                        alt=""
                        draggable="false"
                    />

                    <p>
                        Simply browse through our extensive list of trusted doctors,
                        schedule your appointment hassle-free.
                    </p>

                </motion.div>

                <motion.a
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.5,
                        duration: 0.4,
                        ease: "easeOut"
                    }}
                    href='#speciality'
                    className='
                        flex
                        items-center
                        gap-3
                        rounded-full
                        bg-[#BF6952]
                        px-8
                        py-3.5
                        text-sm
                        sm:text-base
                        font-medium
                        text-white
                        shadow-lg
                        transition-all
                        duration-300
                        hover:scale-105
                        hover:shadow-xl
                        active:scale-95
                        focus:outline-none
                        focus:ring-2
                        focus:ring-white/70
                    '
                >

                    Book appointment

                    <img
                        className='
                            w-3
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                        '
                        src={assets.arrow_icon}
                        alt=""
                    />

                </motion.a>

            </div>


            {/* --------- Header Right --------- */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.35,
                    duration: 0.6,
                    ease: "easeOut"
                }}
                className='
                    relative
                    z-10
                    md:w-1/2
                    flex
                    items-end
                    justify-center
                    min-h-[300px]
                    md:min-h-0
                '
            >

                <img
                    className='
                        w-full
                        max-w-[620px]
                        h-auto
                        object-contain
                        md:absolute
                        bottom-0
                        right-0
                        select-none
                    '
                    src={assets.header_img}
                    alt=""
                    draggable="false"
                />

            </motion.div>

        </motion.div>

    </section>
    )
}

export default Header