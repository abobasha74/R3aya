
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import {
    showSuccess,
    showError,
    showWarning
} from '../utils/toastSound'
import { useContext, useEffect, useState } from 'react'

const Appointment = () => {
    const { docId } = useParams()

    const {
        doctors,
        currencySymbol,
        backendUrl,
        token,
        getDoctosData
    } = useContext(AppContext)

    const daysOfWeek = [
        'SUN',
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT'
    ]

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    // =========================
    // Get Doctor Information
    // =========================

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchDocInfo = async () => {
        const doctor = doctors.find(
            (doc) => doc._id === docId
        )

        setDocInfo(doctor)
    }

    // =========================
    // Get Available Slots
    // =========================

    const getAvailableSolts = async () => {
        setDocSlots([])

        let today = new Date()

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)

            currentDate.setDate(
                today.getDate() + i
            )

            let endTime = new Date()

            endTime.setDate(
                today.getDate() + i
            )

            endTime.setHours(
                21,
                0,
                0,
                0
            )

            if (
                today.getDate() ===
                currentDate.getDate()
            ) {
                currentDate.setHours(
                    currentDate.getHours() > 10
                        ? currentDate.getHours() + 1
                        : 10
                )

                currentDate.setMinutes(
                    currentDate.getMinutes() > 30
                        ? 30
                        : 0
                )
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while (currentDate < endTime) {
                let formattedTime =
                    currentDate.toLocaleTimeString(
                        [],
                        {
                            hour: '2-digit',
                            minute: '2-digit'
                        }
                    )

                let day =
                    currentDate.getDate()

                let month =
                    currentDate.getMonth() + 1

                let year =
                    currentDate.getFullYear()

                const slotDate =
                    day +
                    '_' +
                    month +
                    '_' +
                    year

                const slotTime =
                    formattedTime

                const isSlotAvailable =
                    docInfo.slots_booked[
                        slotDate
                    ] &&
                    docInfo.slots_booked[
                        slotDate
                    ].includes(
                        slotTime
                    )
                        ? false
                        : true

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime:
                            new Date(
                                currentDate
                            ),
                        time:
                            formattedTime
                    })
                }

                currentDate.setMinutes(
                    currentDate.getMinutes() + 30
                )
            }

            setDocSlots(
                (prev) => [
                    ...prev,
                    timeSlots
                ]
            )
        }
    }

    // =========================
    // Book Appointment
    // =========================

    const bookAppointment = async () => {
        // Doctor is unavailable
        if (!docInfo.available) {
            showWarning(

                'This doctor is currently unavailable'
            )

            return
        }

        if (!token) {
            showWarning(
                'Login to book appointment'
            )

            return navigate(
                '/login'
            )
        }

        if (!slotTime) {
            showWarning(
                'Please select a time'
            )

            return
        }

        const date =
            docSlots[
                slotIndex
            ][0].datetime

        let day =
            date.getDate()

        let month =
            date.getMonth() + 1

        let year =
            date.getFullYear()

        const slotDate =
            day +
            '_' +
            month +
            '_' +
            year

        try {
            const { data } =
                await axios.post(
                    backendUrl +
                    '/api/user/book-appointment',
                    {
                        docId,
                        slotDate,
                        slotTime
                    },
                    {
                        headers: {
                            token
                        }
                    }
                )

            if (data.success) {
                showSuccess(
                    data.message
                )

                getDoctosData()

                navigate(
                    '/my-appointments'
                )
            } else {
                showError(
                    data.message
                )
            }
        } catch (error) {
            console.log(error)

            showError(
                error.message
            )
        }
    }

    // =========================
    // Effects
    // =========================

    useEffect(() => {
        if (
            doctors.length > 0
        ) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchDocInfo()
        }
    }, [
        doctors,
        docId,
        fetchDocInfo
    ])

    useEffect(() => {
        if (docInfo) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            getAvailableSolts()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [docInfo])

    // =========================
    // UI
    // =========================

    return docInfo ? (
        <main
            className="
                mx-auto
                w-full
                max-w-7xl
                px-4
                py-8
                sm:px-6
                lg:px-8
                lg:py-12
            "
        >

            {/* =====================
                Doctor Details
            ===================== */}

            <section
                className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                "
            >

                <div
                    className="
                        grid
                        lg:grid-cols-[350px_1fr]
                    "
                >

                    {/* Doctor Image */}

                    <div
                        className="
                            relative
                            min-h-[380px]
                            overflow-hidden
                            bg-[#312D2D]
                            sm:min-h-[450px]
                        "
                    >

                        <img
                            className="
                                absolute
                                inset-0
                                h-full
                                w-full
                                object-cover
                                object-top
                            "
                            src={
                                docInfo.image
                            }
                            alt={
                                docInfo.name
                            }
                        />

                        <div
                            className="
                                absolute
                                inset-x-0
                                bottom-0
                                h-40
                                bg-gradient-to-t
                                from-black/70
                                to-transparent
                            "
                        />

                        {/* Availability */}

                        <div
                            className={`
                                absolute
                                left-5
                                top-5
                                flex
                                items-center
                                gap-2
                                rounded-full
                                px-4
                                py-2
                                text-xs
                                font-medium
                                shadow-lg

                                ${
                                    docInfo.available
                                        ? `
                                            bg-green-500
                                            text-white
                                        `
                                        : `
                                            bg-red-500
                                            text-white
                                        `
                                }
                            `}
                        >

                            <span
                                className="
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-white
                                "
                            />

                            {docInfo.available
                                ? 'Available Now'
                                : 'Currently Unavailable'}

                        </div>

                        <div
                            className="
                                absolute
                                bottom-6
                                left-6
                                right-6
                            "
                        >

                            <p
                                className="
                                    text-2xl
                                    font-semibold
                                    text-white
                                "
                            >
                                {docInfo.name}
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-white/80
                                "
                            >
                                {docInfo.speciality}
                            </p>

                        </div>

                    </div>

                    {/* Doctor Information */}

                    <div
                        className="
                            flex
                            flex-col
                            justify-center
                            p-6
                            sm:p-8
                            lg:p-12
                        "
                    >

                        <div
                            className="
                                flex
                                flex-col
                                gap-5
                                sm:flex-row
                                sm:items-start
                                sm:justify-between
                            "
                        >

                            <div>

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >

                                    <h1
                                        className="
                                            text-3xl
                                            font-semibold
                                            text-[#312D2D]
                                            sm:text-4xl
                                        "
                                    >
                                        {docInfo.name}
                                    </h1>

                                    <img
                                        className="
                                            h-5
                                            w-5
                                        "
                                        src={
                                            assets.verified_icon
                                        }
                                        alt="Verified"
                                    />

                                </div>

                                <p
                                    className="
                                        mt-3
                                        text-sm
                                        text-gray-500
                                        sm:text-base
                                    "
                                >
                                    {docInfo.degree}

                                    <span
                                        className="
                                            mx-2
                                            text-[#BF6952]
                                        "
                                    >
                                        •
                                    </span>

                                    {
                                        docInfo.speciality
                                    }

                                </p>

                            </div>

                            <span
                                className="
                                    w-fit
                                    rounded-full
                                    border
                                    border-[#BF6952]/30
                                    bg-[#BF6952]/10
                                    px-4
                                    py-2
                                    text-xs
                                    font-medium
                                    text-[#BF6952]
                                "
                            >
                                {
                                    docInfo.experience
                                }
                            </span>

                        </div>

                        <div
                            className="
                                my-8
                                h-px
                                bg-gray-100
                            "
                        />

                        {/* About */}

                        <div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-[#312D2D]
                                    "
                                >
                                    About the Doctor
                                </p>

                                <img
                                    className="
                                        h-3.5
                                        w-3.5
                                    "
                                    src={
                                        assets.info_icon
                                    }
                                    alt="Info"
                                />

                            </div>

                            <p
                                className="
                                    mt-3
                                    max-w-3xl
                                    text-sm
                                    leading-7
                                    text-gray-500
                                "
                            >
                                {
                                    docInfo.about
                                }
                            </p>

                        </div>

                        {/* Fee */}

                        <div
                            className="
                                mt-8
                                flex
                                items-center
                                justify-between
                                rounded-2xl
                                border
                                border-[#BF6952]/20
                                bg-[#BF6952]/5
                                px-5
                                py-4
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-xs
                                        text-gray-500
                                    "
                                >
                                    Appointment Fee
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-xl
                                        font-semibold
                                        text-[#312D2D]
                                    "
                                >
                                    {
                                        docInfo.fees
                                    }

                                    <span
                                        className="
                                            ml-2
                                            text-sm
                                            font-medium
                                            text-[#BF6952]
                                        "
                                    >
                                        {
                                            currencySymbol
                                        }
                                    </span>

                                </p>

                            </div>

                            <div
                                className={`
                                    rounded-full
                                    px-4
                                    py-2
                                    text-xs
                                    font-medium

                                    ${
                                        docInfo.available
                                            ? `
                                                bg-green-100
                                                text-green-700
                                            `
                                            : `
                                                bg-red-100
                                                text-red-700
                                            `
                                    }
                                `}
                            >

                                {docInfo.available
                                    ? 'Available'
                                    : 'Unavailable'}

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =====================
                Booking Section
            ===================== */}

            <section
                className="
                    mt-8
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    p-5
                    shadow-sm
                    sm:p-8
                    lg:p-10
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-3
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <div>

                        <h2
                            className="
                                text-2xl
                                font-semibold
                                text-[#312D2D]
                            "
                        >
                            Book Your Appointment
                        </h2>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-gray-500
                            "
                        >
                            Select a suitable date
                            and time.
                        </p>

                    </div>

                    {slotTime && (
                        <span
                            className="
                                w-fit
                                rounded-full
                                bg-[#BF6952]/10
                                px-4
                                py-2
                                text-xs
                                font-medium
                                text-[#BF6952]
                            "
                        >
                            Selected:
                            {' '}
                            {
                                slotTime.toLowerCase()
                            }
                        </span>
                    )}

                </div>

                {/* Dates */}

                <div className="mt-8">

                    <p
                        className="
                            mb-4
                            text-sm
                            font-semibold
                            text-[#312D2D]
                        "
                    >
                        Select a Date
                    </p>

                    <div
                        className="
                            flex
                            gap-3
                            overflow-x-auto
                            pb-3
                        "
                    >

                        {
                            docSlots.length > 0 &&
                            docSlots.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <button
                                        type="button"
                                        key={
                                            index
                                        }
                                        disabled={
                                            !docInfo.available
                                        }
                                        onClick={() => {
                                            setSlotIndex(
                                                index
                                            )

                                            setSlotTime(
                                                ''
                                            )
                                        }}
                                        className={`
                                            min-w-[82px]
                                            rounded-2xl
                                            border
                                            px-4
                                            py-4
                                            text-center
                                            transition-all
                                            duration-300

                                            ${
                                                slotIndex ===
                                                index
                                                    ? `
                                                        border-[#312D2D]
                                                        bg-[#312D2D]
                                                        text-white
                                                        shadow-md
                                                    `
                                                    : `
                                                        border-gray-200
                                                        bg-white
                                                        text-gray-500
                                                        hover:border-[#BF6952]/50
                                                    `
                                            }

                                            ${
                                                !docInfo.available
                                                    ? `
                                                        cursor-not-allowed
                                                        opacity-50
                                                    `
                                                    : `
                                                        cursor-pointer
                                                    `
                                            }
                                        `}
                                    >

                                        <p
                                            className="
                                                text-[11px]
                                                font-medium
                                            "
                                        >
                                            {
                                                daysOfWeek[
                                                    (
                                                        new Date()
                                                            .getDay() +
                                                        index
                                                    ) % 7
                                                ]
                                            }
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-xl
                                                font-semibold
                                            "
                                        >
                                            {
                                                new Date(
                                                    new Date()
                                                        .setDate(
                                                            new Date()
                                                                .getDate() +
                                                            index
                                                        )
                                                ).getDate()
                                            }
                                        </p>

                                    </button>
                                )
                            )
                        }

                    </div>

                </div>

                {/* Times */}

                <div className="mt-8">

                    <p
                        className="
                            mb-4
                            text-sm
                            font-semibold
                            text-[#312D2D]
                        "
                    >
                        Select a Time
                    </p>

                    <div
                        className="
                            flex
                            flex-wrap
                            gap-3
                        "
                    >

                        {
                            docSlots.length > 0 &&
                            docSlots[
                                slotIndex
                            ].map(
                                (
                                    item,
                                    index
                                ) => (
                                    <button
                                        type="button"
                                        key={
                                            index
                                        }
                                        disabled={
                                            !docInfo.available
                                        }
                                        onClick={() =>
                                            setSlotTime(
                                                item.time
                                            )
                                        }
                                        className={`
                                            rounded-xl
                                            border
                                            px-5
                                            py-2.5
                                            text-sm
                                            transition-all
                                            duration-300

                                            ${
                                                item.time ===
                                                slotTime
                                                    ? `
                                                        border-[#BF6952]
                                                        bg-[#BF6952]
                                                        text-white
                                                    `
                                                    : `
                                                        border-gray-200
                                                        bg-white
                                                        text-gray-500
                                                        hover:border-[#BF6952]/50
                                                    `
                                            }

                                            ${
                                                !docInfo.available
                                                    ? `
                                                        cursor-not-allowed
                                                        opacity-50
                                                    `
                                                    : `
                                                        cursor-pointer
                                                    `
                                            }
                                        `}
                                    >
                                        {
                                            item.time
                                                .toLowerCase()
                                        }
                                    </button>
                                )
                            )
                        }

                    </div>

                </div>

                {/* Button */}

                <div
                    className="
                        mt-9
                        border-t
                        border-gray-100
                        pt-7
                    "
                >

                    <button
                        onClick={
                            bookAppointment
                        }
                        disabled={
                            !docInfo.available
                        }
                        className={`
                            w-full
                            rounded-xl
                            px-8
                            py-4
                            text-sm
                            font-medium
                            text-white
                            transition-all
                            duration-300
                            sm:w-auto
                            sm:min-w-[280px]

                            ${
                                docInfo.available
                                    ? `
                                        bg-[#BF6952]
                                        shadow-md
                                        hover:-translate-y-0.5
                                        hover:bg-[#a95743]
                                        hover:shadow-lg
                                    `
                                    : `
                                        cursor-not-allowed
                                        bg-gray-400
                                    `
                            }
                        `}
                    >

                        {
                            docInfo.available
                                ? 'Book an Appointment'
                                : 'Doctor is Unavailable'
                        }

                    </button>

                    <p
                        className="
                            mt-3
                            text-xs
                            text-gray-400
                        "
                    >
                        {
                            docInfo.available
                                ? 'Please select a date and time before booking.'
                                : 'This doctor is currently unavailable for appointments.'
                        }
                    </p>

                </div>

            </section>

            {/* =====================
                Related Doctors
            ===================== */}

            <div className="mt-12">

                <RelatedDoctors
                    speciality={
                        docInfo.speciality
                    }
                    docId={docId}
                />

            </div>

        </main>
    ) : null
}

export default Appointment
