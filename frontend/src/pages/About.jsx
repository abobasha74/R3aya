import { assets } from '../assets/assets'

const About = () => {
return (
<section className=' relative mx-4 md:mx-10 lg:mx-14 py-10 md:py-16 '>

  {/* -------- About Title -------- */}
  <div className='flex flex-col items-center text-center'>

    <p className='
      text-3xl
      sm:text-4xl
      font-medium
      tracking-tight
      text-[#312D2D]
    '>
      ABOUT
      <span className='
        ml-2
        font-semibold
        text-[#BF6952]
      '>
        US
      </span>
    </p>

    <div className='
      mt-4
      h-1
      w-16
      rounded-full
      bg-[#BF6952]
    ' />

  </div>


  {/* -------- About Content -------- */}
  <div className='
    mt-12
    flex
    flex-col
    items-center
    gap-10
    md:flex-row
    md:items-stretch
    lg:gap-16
  '>

    {/* About Image */}
    <div className='
      w-full
      md:w-[42%]
      flex
      items-center
      justify-center
    '>

      <div className='
        relative
        w-full
        max-w-[430px]
        overflow-hidden
        rounded-3xl
        bg-[#BF6952]/10
        shadow-lg
      '>

        <img
          className='
            w-full
            object-cover
            select-none
            transition-transform
            duration-500
            hover:scale-105
          '
          src={assets.about_image}
          alt="About Prescripto"
          draggable="false"
        />

      </div>

    </div>


    {/* About Text */}
    <div className='
      flex
      flex-col
      justify-center
      gap-6
      w-full
      md:w-[58%]
      text-sm
      sm:text-base
      leading-7
      text-gray-600
    '>

      <p>
        Welcome to Prescripto, your trusted partner in managing your
        healthcare needs conveniently and efficiently. At Prescripto,
        we understand the challenges individuals face when it comes to
        scheduling doctor appointments and managing their health records.
      </p>

      <p>
        Prescripto is committed to excellence in healthcare technology.
        We continuously strive to enhance our platform, integrating the
        latest advancements to improve user experience and deliver
        superior service. Whether you're booking your first appointment
        or managing ongoing care, Prescripto is here to support you every
        step of the way.
      </p>

      {/* Vision Box */}
      <div className='
        rounded-2xl
        border
        border-[#BF6952]/15
        bg-[#BF6952]/5
        p-6
      '>

        <b className='
          text-lg
          text-[#BF6952]
        '>
          Our Vision
        </b>

        <p className='
          mt-3
          leading-7
          text-gray-600
        '>
          Our vision at Prescripto is to create a seamless healthcare
          experience for every user. We aim to bridge the gap between
          patients and healthcare providers, making it easier for you to
          access the care you need, when you need it.
        </p>

      </div>

    </div>

  </div>


  {/* -------- Why Choose Us -------- */}
  <div className='
    mt-24
    flex
    flex-col
    items-center
    text-center
  '>

    <p className='
      text-2xl
      sm:text-3xl
      font-medium
      text-[#312D2D]
    '>

      WHY
      <span className='
        ml-2
        font-semibold
        text-[#BF6952]
      '>
        CHOOSE US
      </span>

    </p>

    <div className='
      mt-4
      h-1
      w-16
      rounded-full
      bg-[#BF6952]
    ' />

  </div>


  {/* -------- Features -------- */}
  <div className='
    mt-12
    mb-12
    grid
    grid-cols-1
    gap-5
    md:grid-cols-3
  '>

    {/* Efficiency */}
    <div className='
      group
      min-h-[230px]
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-8
      md:p-10
      flex
      flex-col
      justify-center
      gap-5
      text-[#312D2D]
      cursor-pointer
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-[#BF6952]
      hover:bg-[#BF6952]
      hover:text-white
      hover:shadow-xl
    '>

      <b className='
        text-lg
        tracking-wide
      '>
        EFFICIENCY
      </b>

      <p className='
        text-[15px]
        leading-7
      '>
        Streamlined appointment scheduling that fits into your busy
        lifestyle.
      </p>

    </div>


    {/* Convenience */}
    <div className='
      group
      min-h-[230px]
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-8
      md:p-10
      flex
      flex-col
      justify-center
      gap-5
      text-[#312D2D]
      cursor-pointer
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-[#BF6952]
      hover:bg-[#BF6952]
      hover:text-white
      hover:shadow-xl
    '>

      <b className='
        text-lg
        tracking-wide
      '>
        CONVENIENCE
      </b>

      <p className='
        text-[15px]
        leading-7
      '>
        Access to a network of trusted healthcare professionals in your
        area.
      </p>

    </div>


    {/* Personalization */}
    <div className='
      group
      min-h-[230px]
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-8
      md:p-10
      flex
      flex-col
      justify-center
      gap-5
      text-[#312D2D]
      cursor-pointer
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-[#BF6952]
      hover:bg-[#BF6952]
      hover:text-white
      hover:shadow-xl
    '>

      <b className='
        text-lg
        tracking-wide
      '>
        PERSONALIZATION
      </b>

      <p className='
        text-[15px]
        leading-7
      '>
        Tailored recommendations and reminders to help you stay on top
        of your health.
      </p>

    </div>

  </div>

</section>
  )
}

export default About