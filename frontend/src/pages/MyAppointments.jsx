import { useContext, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import {
    showSuccess,
    showError,
    
} from '../utils/toastSound'
import { assets } from '../assets/assets'

const MyAppointments = () => {

const { backendUrl, token } = useContext(AppContext)
const navigate = useNavigate()

const [appointments, setAppointments] = useState([])
const [payment, setPayment] = useState('')

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
}

// Getting User Appointments Data Using API
// eslint-disable-next-line react-hooks/exhaustive-deps
const getUserAppointments = useCallback(async () => {
    try {

        const { data } = await axios.get(
            backendUrl + '/api/user/appointments',
            { headers: { token } }
        )

        setAppointments(data.appointments.reverse())

    } catch (error) {
        console.log(error)
        showError(error.message)
    }
})

// Function to cancel appointment Using API
const cancelAppointment = async (appointmentId) => {

    try {

        const { data } = await axios.post(
            backendUrl + '/api/user/cancel-appointment',
            { appointmentId },
            { headers: { token } }
        )

        if (data.success) {
            showSuccess(data.message)
            getUserAppointments()
        } else {
            showError(data.message)
        }

    } catch (error) {
        console.log(error)
        showError(error.message)
    }

}

const initPay = (order) => {

    const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: 'Appointment Payment',

        description: "Appointment Payment",

        order_id: order.id,

        receipt: order.receipt,

        handler: async (response) => {

            console.log(response)

            try {

                const { data } = await axios.post(
                    backendUrl + "/api/user/verifyRazorpay",
                    response,
                    { headers: { token } }
                )

                if (data.success) {

                    navigate('/my-appointments')

                    getUserAppointments()

                }

            } catch (error) {

                console.log(error)

                showError(error.message)

            }

        }

    };

    const rzp = new window.Razorpay(options);

    rzp.open();

};


// Function to make payment using razorpay
const appointmentRazorpay = async (appointmentId) => {

    try {

        const { data } = await axios.post(

            backendUrl + '/api/user/payment-razorpay',

            { appointmentId },

            { headers: { token } }

        )

        if (data.success) {

            initPay(data.order)

        } else {

            showError(data.message)

        }

    } catch (error) {

        console.log(error)

        showError(error.message)

    }

}


// Function to make payment using stripe
const appointmentStripe = async (appointmentId) => {

    try {

        const { data } = await axios.post(

            backendUrl + '/api/user/payment-stripe',

            { appointmentId },

            { headers: { token } }

        )

        if (data.success) {

            const { session_url } = data

            window.location.replace(session_url)

        } else {

            showError(data.message)

        }

    } catch (error) {

        console.log(error)

        showError(error.message)

    }

}


useEffect(() => {

    if (token) {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        getUserAppointments()

    }


}, [getUserAppointments, token])


return (

    <section className='
        mx-4
        mb-20
        mt-8
        md:mx-10
        lg:mx-14
    '>


        {/* ---------------- Page Header ---------------- */}

        <div className='
            mb-8
            flex
            flex-col
            gap-4
            rounded-2xl
            border
            border-gray-200
            bg-white
            px-6
            py-6
            shadow-sm
            sm:flex-row
            sm:items-center
            sm:justify-between
            md:px-8
        '>

            <div>

                <p className='
                    text-2xl
                    font-semibold
                    text-[#312D2D]
                    md:text-3xl
                '>

                    My Appointments

                </p>

                <p className='
                    mt-2
                    text-sm
                    text-gray-500
                '>

                    View, manage, pay for, or cancel your appointments.

                </p>

            </div>


            <div className='
                w-fit
                rounded-full
                bg-[#BF6952]/10
                px-4
                py-2
                text-sm
                font-medium
                text-[#BF6952]
            '>

                {appointments.length} Appointment
                {appointments.length !== 1 ? 's' : ''}

            </div>

        </div>


        {/* ---------------- Appointments ---------------- */}

        <div className='
            flex
            flex-col
            gap-6
        '>


            {appointments.map((item, index) => (

                <div

                    key={index}

                    className='
                        overflow-hidden
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        shadow-sm
                        transition-all
                        duration-300
                        hover:border-[#BF6952]/30
                        hover:shadow-lg
                    '

                >


                    <div className='
                        flex
                        flex-col
                        gap-6
                        p-5
                        md:flex-row
                        md:items-center
                        md:p-6
                    '>


                        {/* Doctor Image */}

                        <div className='
                            flex
                            justify-center
                            md:block
                        '>

                            <div className='
                                overflow-hidden
                                rounded-2xl
                                bg-[#312D2D]
                            '>

                                <img

                                    className='
                                        h-40
                                        w-40
                                        object-cover
                                        object-top
                                        transition-transform
                                        duration-500
                                        hover:scale-105
                                    '

                                    src={item.docData.image}

                                    alt={item.docData.name}

                                />

                            </div>

                        </div>


                        {/* Doctor Information */}

                        <div className='
                            flex-1
                            text-center
                            md:text-left
                        '>


                            <div className='
                                flex
                                flex-col
                                gap-3
                                md:flex-row
                                md:items-start
                                md:justify-between
                            '>


                                <div>

                                    <p className='
                                        text-xl
                                        font-semibold
                                        text-[#312D2D]
                                    '>

                                        {item.docData.name}

                                    </p>


                                    <p className='
                                        mt-1
                                        text-sm
                                        font-medium
                                        text-[#BF6952]
                                    '>

                                        {item.docData.speciality}

                                    </p>

                                </div>


                                {/* Appointment Status */}

                                <div className='
                                    flex
                                    justify-center
                                    md:justify-end
                                '>

                                    {item.cancelled && !item.isCompleted && (

                                        <span className='
                                            rounded-full
                                            bg-red-50
                                            px-4
                                            py-1.5
                                            text-xs
                                            font-medium
                                            text-red-600
                                        '>

                                            Cancelled

                                        </span>

                                    )}


                                    {item.isCompleted && (

                                        <span className='
                                            rounded-full
                                            bg-green-50
                                            px-4
                                            py-1.5
                                            text-xs
                                            font-medium
                                            text-green-600
                                        '>

                                            Completed

                                        </span>

                                    )}


                                    {!item.cancelled && !item.isCompleted && (

                                        <span className='
                                            rounded-full
                                            bg-[#BF6952]/10
                                            px-4
                                            py-1.5
                                            text-xs
                                            font-medium
                                            text-[#BF6952]
                                        '>

                                            Upcoming

                                        </span>

                                    )}

                                </div>

                            </div>


                            {/* Appointment Details */}

                            <div className='
                                mt-5
                                grid
                                grid-cols-1
                                gap-4
                                border-t
                                border-gray-100
                                pt-5
                                sm:grid-cols-2
                            '>


                                <div>

                                    <p className='
                                        text-xs
                                        font-medium
                                        uppercase
                                        tracking-wide
                                        text-gray-400
                                    '>

                                        Clinic Address

                                    </p>


                                    <p className='
                                        mt-1
                                        text-sm
                                        leading-6
                                        text-gray-600
                                    '>

                                        {item.docData.address.line1}

                                        <br />

                                        {item.docData.address.line2}

                                    </p>

                                </div>


                                <div>

                                    <p className='
                                        text-xs
                                        font-medium
                                        uppercase
                                        tracking-wide
                                        text-gray-400
                                    '>

                                        Appointment Date

                                    </p>


                                    <p className='
                                        mt-1
                                        text-sm
                                        font-medium
                                        text-[#312D2D]
                                    '>

                                        {slotDateFormat(item.slotDate)}

                                    </p>


                                    <p className='
                                        mt-1
                                        text-sm
                                        text-gray-500
                                    '>

                                        {item.slotTime}

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Actions */}

                        <div className='
                            flex
                            w-full
                            flex-col
                            gap-2
                            md:w-48
                        '>


                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (

                                <button

                                    onClick={() => setPayment(item._id)}

                                    className='
                                        rounded-xl
                                        border
                                        border-[#BF6952]
                                        px-4
                                        py-3
                                        text-sm
                                        font-medium
                                        text-[#BF6952]
                                        transition-all
                                        duration-300
                                        hover:bg-[#BF6952]
                                        hover:text-white
                                    '

                                >

                                    Pay Online

                                </button>

                            )}


                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (

                                <button

                                    onClick={() => appointmentStripe(item._id)}

                                    className='
                                        flex
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-gray-200
                                        px-4
                                        py-3
                                        transition-all
                                        duration-300
                                        hover:bg-gray-50
                                    '

                                >

                                    <img

                                        className='
                                            max-h-5
                                            max-w-20
                                        '

                                        src={assets.stripe_logo}

                                        alt="Stripe"

                                    />

                                </button>

                            )}


                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (

                                <button

                                    onClick={() => appointmentRazorpay(item._id)}

                                    className='
                                        flex
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-gray-200
                                        px-4
                                        py-3
                                        transition-all
                                        duration-300
                                        hover:bg-gray-50
                                    '

                                >

                                    <img

                                        className='
                                            max-h-5
                                            max-w-20
                                        '

                                        src={assets.razorpay_logo}

                                        alt="Razorpay"

                                    />

                                </button>

                            )}


                            {!item.cancelled && item.payment && !item.isCompleted && (

                                <button

                                    className='
                                        rounded-xl
                                        border
                                        border-green-200
                                        bg-green-50
                                        px-4
                                        py-3
                                        text-sm
                                        font-medium
                                        text-green-600
                                    '

                                >

                                    Paid

                                </button>

                            )}


                            {item.isCompleted && (

                                <button

                                    className='
                                        rounded-xl
                                        border
                                        border-green-500
                                        px-4
                                        py-3
                                        text-sm
                                        font-medium
                                        text-green-600
                                    '

                                >

                                    Completed

                                </button>

                            )}


                            {!item.cancelled && !item.isCompleted && (

                                <button

                                    onClick={() => cancelAppointment(item._id)}

                                    className='
                                        rounded-xl
                                        border
                                        border-red-200
                                        px-4
                                        py-3
                                        text-sm
                                        font-medium
                                        text-red-500
                                        transition-all
                                        duration-300
                                        hover:bg-red-500
                                        hover:text-white
                                    '

                                >

                                    Cancel Appointment

                                </button>

                            )}


                            {item.cancelled && !item.isCompleted && (

                                <button

                                    className='
                                        rounded-xl
                                        border
                                        border-red-200
                                        bg-red-50
                                        px-4
                                        py-3
                                        text-sm
                                        font-medium
                                        text-red-500
                                    '

                                >

                                    Appointment Cancelled

                                </button>

                            )}

                        </div>

                    </div>

                </div>

            ))}


            {/* Empty State */}

            {appointments.length === 0 && (

                <div className='
                    rounded-2xl
                    border
                    border-dashed
                    border-gray-300
                    bg-white
                    px-6
                    py-16
                    text-center
                '>

                    <p className='
                        text-xl
                        font-semibold
                        text-[#312D2D]
                    '>

                        No Appointments Yet

                    </p>


                    <p className='
                        mt-2
                        text-sm
                        text-gray-500
                    '>

                        Your booked appointments will appear here.

                    </p>

                </div>

            )}

        </div>

    </section>
    )
}

export default MyAppointments