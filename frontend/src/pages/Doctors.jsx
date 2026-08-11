import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const Doctors = () => {
  const { speciality } = useParams();

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  // نفس الـ Logic الخاص بالفلترة
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    applyFilter();
  }, [applyFilter, doctors, speciality]);

  return (
    <section
      className="
  mx-4
  md:mx-10
  lg:mx-14
  py-8
  md:py-12
"
    >
      {/* ---------------- Simple Page Header ---------------- */}

      <div
        className="
    mb-8
    flex
    flex-col
    justify-between
    gap-4
    border-b
    border-gray-200
    pb-6
    sm:flex-row
    sm:items-end
  "
      >
        <div>
          <p
            className="
        text-2xl
        font-semibold
        text-[#312D2D]
        sm:text-3xl
      "
          >
            Find Your
            <span
              className="
          ml-2
          text-[#BF6952]
        "
            >
              Doctor
            </span>
          </p>

          <p
            className="
        mt-2
        max-w-xl
        text-sm
        leading-6
        text-gray-500
      "
          >
            Browse trusted doctors and choose the right specialist for your
            healthcare needs.
          </p>
        </div>

        {/* Doctors Count */}

        <div
          className="
      w-fit
      rounded-full
      bg-[#BF6952]/10
      px-4
      py-2
      text-sm
      font-medium
      text-[#BF6952]
    "
        >
          {filterDoc.length} Doctors Available
        </div>
      </div>

      {/* ---------------- Main Content ---------------- */}

      <div
        className="
    flex
    flex-col
    items-start
    gap-6
    lg:flex-row
  "
      >
        {/* ---------------- Mobile Filter Button ---------------- */}

        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`
        flex
        items-center
        justify-center
        rounded-xl
        border
        px-5
        py-3
        text-sm
        font-medium
        shadow-sm
        transition-all
        duration-300
        lg:hidden

        ${
          showFilter
            ? "border-[#312D2D] bg-[#312D2D] text-white"
            : "border-gray-200 bg-white text-[#312D2D] hover:border-[#BF6952]"
        }
      `}
        >
          {showFilter ? "Close Filters" : "Filter by Speciality"}
        </button>

        {/* ---------------- Filters ---------------- */}

        <aside
          className={`
        w-full
        flex-shrink-0
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm
        lg:block
        lg:w-[235px]

        ${showFilter ? "block" : "hidden"}
      `}
        >
          <p
            className="
        mb-4
        border-b
        border-gray-100
        pb-3
        text-base
        font-semibold
        text-[#312D2D]
      "
          >
            Specialities
          </p>

          <div
            className="
        flex
        flex-col
        gap-2
      "
          >
            <p
              onClick={() =>
                speciality === "General physician"
                  ? navigate("/doctors")
                  : navigate("/doctors/General physician")
              }
              className={`
            cursor-pointer
            rounded-lg
            px-4
            py-2.5
            text-sm
            transition-all
            duration-300

            ${
              speciality === "General physician"
                ? "bg-[#312D2D] font-medium text-[#BF6952]"
                : "text-gray-600 hover:bg-[#BF6952]/10 hover:text-[#312D2D]"
            }
          `}
            >
              General Physician
            </p>

            <p
              onClick={() =>
                speciality === "Gynecologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Gynecologist")
              }
              className={`
            cursor-pointer
            rounded-lg
            px-4
            py-2.5
            text-sm
            transition-all
            duration-300

            ${
              speciality === "Gynecologist"
                ? "bg-[#312D2D] font-medium text-[#BF6952]"
                : "text-gray-600 hover:bg-[#BF6952]/10 hover:text-[#312D2D]"
            }
          `}
            >
              Gynecologist
            </p>

            <p
              onClick={() =>
                speciality === "Dermatologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Dermatologist")
              }
              className={`
            cursor-pointer
            rounded-lg
            px-4
            py-2.5
            text-sm
            transition-all
            duration-300

            ${
              speciality === "Dermatologist"
                ? "bg-[#312D2D] font-medium text-[#BF6952]"
                : "text-gray-600 hover:bg-[#BF6952]/10 hover:text-[#312D2D]"
            }
          `}
            >
              Dermatologist
            </p>

            <p
              onClick={() =>
                speciality === "Pediatricians"
                  ? navigate("/doctors")
                  : navigate("/doctors/Pediatricians")
              }
              className={`
            cursor-pointer
            rounded-lg
            px-4
            py-2.5
            text-sm
            transition-all
            duration-300

            ${
              speciality === "Pediatricians"
                ? "bg-[#312D2D] font-medium text-[#BF6952]"
                : "text-gray-600 hover:bg-[#BF6952]/10 hover:text-[#312D2D]"
            }
          `}
            >
              Pediatricians
            </p>

            <p
              onClick={() =>
                speciality === "Neurologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Neurologist")
              }
              className={`
            cursor-pointer
            rounded-lg
            px-4
            py-2.5
            text-sm
            transition-all
            duration-300

            ${
              speciality === "Neurologist"
                ? "bg-[#312D2D] font-medium text-[#BF6952]"
                : "text-gray-600 hover:bg-[#BF6952]/10 hover:text-[#312D2D]"
            }
          `}
            >
              Neurologist
            </p>

            <p
              onClick={() =>
                speciality === "Gastroenterologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Gastroenterologist")
              }
              className={`
            cursor-pointer
            rounded-lg
            px-4
            py-2.5
            text-sm
            transition-all
            duration-300

            ${
              speciality === "Gastroenterologist"
                ? "bg-[#312D2D] font-medium text-[#BF6952]"
                : "text-gray-600 hover:bg-[#BF6952]/10 hover:text-[#312D2D]"
            }
          `}
            >
              Gastroenterologist
            </p>
          </div>
        </aside>

        {/* ---------------- Doctors ---------------- */}

        <div
          className="
      w-full
      flex-1
    "
        >
          <div
            className="
        grid
        grid-cols-1
        gap-5
        sm:grid-cols-2
        xl:grid-cols-3
      "
          >
            {filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  if (!item.available) {
                    return;
                  }

                  navigate(`/appointment/${item._id}`);
                  scrollTo(0, 0);
                }}
                className={`
  group
  cursor-pointer
  overflow-hidden
  rounded-2xl
  border
  border-gray-200
  bg-white
  shadow-sm
  transition-all
  duration-500
  hover:-translate-y-2
  hover:border-[#BF6952]/40
  hover:shadow-lg
  ${!item.available ? "opacity-60 cursor-not-allowed" : ""}
`}
              >
                {/* Doctor Image */}

                <div
                  className="
              relative
              overflow-hidden
              bg-[#312D2D]
            "
                >
                  <img
                    className="
                  h-64
                  w-full
                  object-cover
                  object-top
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
                    src={item.image}
                    alt={item.name}
                  />

                  {/* Status */}

                  <div
                    className="
                absolute
                left-3
                top-3
                flex
                items-center
                gap-2
                rounded-full
                bg-white/95
                px-3
                py-1.5
                text-xs
                shadow-sm
              "
                  >
                    <span
                      className={`
                    h-2
                    w-2
                    rounded-full

                    ${item.available ? "bg-green-500" : "bg-gray-400"}
                  `}
                    />

                    <span
                      className={
                        item.available ? "text-green-600" : "text-gray-500"
                      }
                    >
                      {item.available ? "Available" : "Not Available"}
                    </span>
                  </div>
                </div>

                {/* Details */}

                <div
                  className="
              p-4
            "
                >
                  <p
                    className="
                text-lg
                font-semibold
                text-[#312D2D]
                transition-colors
                duration-300
                group-hover:text-[#BF6952]
              "
                  >
                    {item.name}
                  </p>

                  <p
                    className="
                mt-1
                text-sm
                text-gray-500
              "
                  >
                    {item.speciality}
                  </p>

                  <div
                    className="
                mt-4
                flex
                items-center
                justify-between
                border-t
                border-gray-100
                pt-3
              "
                  >
                    <span
                      className="
                  text-xs
                  font-medium
                  text-[#BF6952]
                "
                    >
                      View Profile
                    </span>

                    <span
                      className="
                  text-base
                  text-[#BF6952]
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
