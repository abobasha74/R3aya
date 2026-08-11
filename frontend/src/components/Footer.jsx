import 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion";

const containerVariants = {
hidden: { opacity: 0 },
visible: {
opacity: 1,
transition: { staggerChildren: 0.15 },
},
};

const itemVariants = {
hidden: { opacity: 0, y: 16 },
visible: {
opacity: 1,
y: 0,
transition: { duration: 0.4, ease: "easeOut" },
},
};

const Footer = () => {
return (
<footer className=' relative mt-32 mx-4 md:mx-10 lg:mx-14 mb-6 '>

  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className='
      relative
      overflow-hidden
      rounded-3xl
      border
      border-[#BF6952]/10
      bg-white
      px-6
      py-12
      shadow-[0_10px_40px_rgba(0,0,0,0.07)]
      sm:px-10
      md:px-14
      md:py-16
    '
  >

    {/* Decorative Background */}
    <div className='
      absolute
      -right-28
      -top-28
      h-64
      w-64
      rounded-full
      bg-[#BF6952]/5
      blur-3xl
      pointer-events-none
    ' />

    <div className='
      absolute
      -left-24
      bottom-0
      h-52
      w-52
      rounded-full
      bg-[#BF6952]/5
      blur-3xl
      pointer-events-none
    ' />

    <div className='
      relative
      z-10
      grid
      grid-cols-1
      gap-12
      text-sm
      sm:grid-cols-[2fr_1fr_1fr]
      sm:gap-10
      lg:gap-16
    '>

      {/* Logo and Description */}
      <motion.div variants={itemVariants}>

        <img
          className='
            mb-6
            w-40
            select-none
          '
          src={assets.logo}
          alt="R3AYA"
          draggable="false"
        />

        <p className='
          max-w-xl
          leading-7
          text-gray-500
        '>
          Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a
          type specimen book.
        </p>

      </motion.div>


      {/* Company */}
      <motion.div variants={itemVariants}>

        <p className='
          mb-6
          text-lg
          font-semibold
          tracking-wide
          text-[#262626]
        '>
          COMPANY
        </p>

        <ul className='
          flex
          flex-col
          gap-3
          text-gray-500
        '>

          <li className='
            w-fit
            cursor-pointer
            transition-all
            duration-300
            hover:translate-x-1
            hover:text-[#BF6952]
          '>
            Home
          </li>

          <li className='
            w-fit
            cursor-pointer
            transition-all
            duration-300
            hover:translate-x-1
            hover:text-[#BF6952]
          '>
            About us
          </li>

          <li className='
            w-fit
            cursor-pointer
            transition-all
            duration-300
            hover:translate-x-1
            hover:text-[#BF6952]
          '>
            Delivery
          </li>

          <li className='
            w-fit
            cursor-pointer
            transition-all
            duration-300
            hover:translate-x-1
            hover:text-[#BF6952]
          '>
            Privacy policy
          </li>

        </ul>

      </motion.div>


      {/* Get In Touch */}
      <motion.div variants={itemVariants}>

        <p className='
          mb-6
          text-lg
          font-semibold
          tracking-wide
          text-[#262626]
        '>
          GET IN TOUCH
        </p>

        <ul className='
          flex
          flex-col
          gap-3
          text-gray-500
        '>

          <li className='
            w-fit
            cursor-pointer
            transition-all
            duration-300
            hover:translate-x-1
            hover:text-[#BF6952]
          '>
            +20-01005607979
          </li>

          <li className='
            w-fit
            cursor-pointer
            break-all
            transition-all
            duration-300
            hover:translate-x-1
            hover:text-[#BF6952]
          '>
            R3AYA@gmail.com
          </li>

        </ul>

      </motion.div>

    </div>


    {/* Copyright */}
    <div className='
      relative
      z-10
      mt-12
      border-t
      border-gray-200
    '>

      <p className='
        py-6
        text-center
        text-sm
        text-gray-500
      '>
        Copyright 2025 @ R3AYA.com - All Right Reserved.
      </p>

    </div>

  </motion.div>

</footer>
  )
}

export default Footer