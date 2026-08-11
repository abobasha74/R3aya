import 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";

const containerVariants = {
hidden: { opacity: 0 },
visible: {
opacity: 1,
transition: {
staggerChildren: 0.08,
},
},
};

const itemVariants = {
hidden: { opacity: 0, y: 20 },
visible: {
opacity: 1,
y: 0,
transition: { duration: 0.4, ease: "easeOut" },
},
};

const SpecialityMenu = () => {
return (
<div id='speciality' className=' flex flex-col items-center gap-5 py-20 text-[#262626] ' >

        <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.45,
                ease: "easeOut"
            }}
            className='
                text-3xl
                sm:text-4xl
                font-semibold
                text-center
            '
        >
            Find by Speciality
        </motion.h1>

        <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.1,
                duration: 0.4,
                ease: "easeOut"
            }}
            className='
                max-w-xl
                px-5
                text-center
                text-sm
                sm:text-base
                leading-relaxed
                text-gray-500
            '
        >
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
        </motion.p>

        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className='
                flex
                sm:justify-center
                gap-5
                sm:gap-6
                pt-8
                px-5
                w-full
                overflow-x-auto
                scrollbar-hide
            '
        >

            {specialityData.map((item, index) => (

                <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{
                        y: -8,
                        scale: 1.05
                    }}
                    whileTap={{
                        scale: 0.95
                    }}
                    className='flex-shrink-0'
                >

                    <Link
                        to={`/doctors/${item.speciality}`}
                        onClick={() => scrollTo(0, 0)}
                        className='
                            flex
                            flex-col
                            items-center
                            justify-center
                            gap-4
                            min-w-[145px]
                            min-h-[185px]
                            p-5
                            rounded-2xl
                            bg-white
                            border
                            border-[#BF6952]/10
                            shadow-sm
                            cursor-pointer
                            transition-all
                            duration-300
                            hover:shadow-lg
                            hover:border-[#BF6952]/30
                        '
                    >

                        <div className='
                            flex
                            items-center
                            justify-center
                            w-28
                            h-28
                            rounded-full
                            bg-[#BF6952]/5
                        '>

                            <img
                                className='
                                    w-24
                                    sm:w-28
                                    object-contain
                                    select-none
                                '
                                src={item.image}
                                alt=""
                                draggable="false"
                            />

                        </div>

                        <p className='
                            text-sm
                            sm:text-base
                            font-medium
                            text-[#262626]
                            text-center
                        '>
                            {item.speciality}
                        </p>

                    </Link>

                </motion.div>

            ))}

        </motion.div>

    </div>
    )
}

export default SpecialityMenu