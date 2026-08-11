import { assets } from '../assets/assets'

const Contact = () => {
return (
<section className=' relative mx-4 md:mx-10 lg:mx-14 py-10 md:py-16 '>

  {/* -------- Page Title -------- */}
  <div className='
    flex
    flex-col
    items-center
    text-center
  '>

    <p className='
      text-3xl
      sm:text-4xl
      font-medium
      text-[#312D2D]
    '>

      CONTACT

      <span className='
        ml-2
        font-semibold
        text-[#BF6952]
      '>
        US
      </span>

    </p>

    <p className='
      mt-4
      max-w-xl
      px-4
      text-sm
      leading-7
      text-gray-500
      sm:text-base
    '>
      We are always here to help. Contact us for any questions,
      support, or information about our healthcare services.
    </p>

    <div className='
      mt-5
      h-1
      w-16
      rounded-full
      bg-[#BF6952]
    ' />

  </div>


  {/* -------- Contact Content -------- */}
  <div className='
    mt-12
    mb-16
    flex
    flex-col
    items-center
    gap-10
    md:flex-row
    md:items-stretch
    lg:gap-16
  '>


    {/* Contact Image */}
    <div className='
      flex
      w-full
      items-center
      justify-center
      md:w-[45%]
    '>

      <div className='
        relative
        w-full
        max-w-[440px]
        overflow-hidden
        rounded-3xl
        bg-[#BF6952]/10
        shadow-lg
      '>

        <img

          className='
            w-full
            select-none
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          '

          src={assets.contact_image}

          alt="Contact R3AYA"

          draggable="false"

        />

      </div>

    </div>


    {/* Contact Information */}
    <div className='
      flex
      w-full
      flex-col
      justify-center
      gap-5
      md:w-[55%]
    '>


      {/* Office Card */}
      <div className='
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:border-[#BF6952]/30
        hover:shadow-md
      '>

        <p className='
          text-lg
          font-semibold
          text-[#312D2D]
        '>
          OUR OFFICE
        </p>

        <div className='
          mt-4
          flex
          flex-col
          gap-2
          text-sm
          leading-7
          text-gray-500
        '>

          <p>
            Mansoura, Dakahlia
            <br />
            Egypt
          </p>

          <p>
            Tel: +20 100 560 7979
            <br />
            Email: support@r3aya.com
          </p>

        </div>

      </div>


      {/* Careers Card */}
      <div className='
        rounded-2xl
        border
        border-gray-200
        bg-[#BF6952]/5
        p-6
        transition-all
        duration-300
        hover:border-[#BF6952]/30
      '>

        <p className='
          text-lg
          font-semibold
          text-[#312D2D]
        '>
          CAREERS AT R3AYA
        </p>

        <p className='
          mt-3
          text-sm
          leading-7
          text-gray-500
        '>
          Learn more about our team, available opportunities,
          and how you can build your career with R3AYA.
        </p>


        <button

          className='
            mt-5
            rounded-full
            border
            border-[#312D2D]
            bg-transparent
            px-8
            py-3
            text-sm
            font-medium
            text-[#312D2D]
            transition-all
            duration-300
            hover:scale-105
            hover:border-[#BF6952]
            hover:bg-[#BF6952]
            hover:text-white
            active:scale-95
          '

        >

          Explore Jobs

        </button>

      </div>

    </div>

  </div>

</section>
  )
}

export default Contact