import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  return (
    <section
      className="
        flex
        flex-col
        items-center
        gap-5
        my-20
        mx-4
        md:mx-10
        lg:mx-14
    "
    >
      {/* Section Title */}
      <div className="flex flex-col items-center gap-3 text-center">
        <h1
          className="
                text-3xl
                sm:text-4xl
                font-semibold
                text-[#BF6952]
            "
        >
          Top Doctors to Book
        </h1>

        <p
          className="
                max-w-xl
                px-4
                text-center
                text-sm
                sm:text-base
                leading-relaxed
                text-[#5C5C5C]
            "
        >
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      {/* Doctors Grid */}
      <div
        className="
            w-full
            grid
            grid-cols-auto
            gap-5
            pt-6
            px-2
            sm:px-0
        "
      >
        {doctors.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              if (!item.available) {
                return;
              }

              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className={`
        group
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        cursor-pointer
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-[#BF6952]/40
        hover:shadow-xl
        ${!item.available ? "opacity-60 cursor-not-allowed" : ""}
    `}
            key={index}
          >
            {/* Doctor Image */}
            <div
              className="
                        relative
                        overflow-hidden
                        bg-primary
                    "
            >
              <img
                className="
                                w-full
                                bg-primary
                                object-cover
                                transition-transform
                                duration-500
                                group-hover:scale-105
                            "
                src={item.image}
                alt={item.name}
              />

              {/* Image Overlay */}
              <div
                className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/10
                            via-transparent
                            to-transparent
                            opacity-0
                            transition-opacity
                            duration-500
                            group-hover:opacity-100
                        "
              />
            </div>

            {/* Doctor Information */}
            <div className="p-4">
              {/* Availability */}
              <div
                className={`
                            flex
                            items-center
                            gap-2
                            mb-2
                            text-sm
                            ${
                              item.available
                                ? "text-green-500"
                                : "text-gray-500"
                            }
                        `}
              >
                <span
                  className={`
                                w-2
                                h-2
                                rounded-full
                                ${
                                  item.available
                                    ? "bg-green-500"
                                    : "bg-gray-500"
                                }
                            `}
                />

                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>

              {/* Doctor Name */}
              <p
                className="
                            text-[#262626]
                            text-lg
                            font-semibold
                            truncate
                        "
              >
                {item.name}
              </p>

              {/* Speciality */}
              <p
                className="
                            mt-1
                            text-[#5C5C5C]
                            text-sm
                        "
              >
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="
                mt-10
                rounded-full
                bg-[#312D2D]
                px-12
                py-3.5
                text-white
                font-medium
                shadow-md
                transition-all
                duration-300
                hover:scale-105
                hover:bg-[#BF6952]
                hover:shadow-lg
                active:scale-95
                focus:outline-none
                focus:ring-2
                focus:ring-[#BF6952]/40
            "
      >
        More Doctors
      </button>
    </section>
  );
};

export default TopDoctors;
