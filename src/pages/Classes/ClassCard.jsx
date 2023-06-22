import { BiDollarCircle } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlinePeopleOutline } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useEnrolledClasses from "../../hooks/useEnrolledClasses";
import { useNavigate } from "react-router-dom";

const ClassCard = ({ item }) => {
  const { user } = useAuth();
  const [enrolledClasses] = useEnrolledClasses();
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();

  const existingEnrolled = enrolledClasses.find(
    (enrolledClass) => enrolledClass._id === item._id
  );

  console.log();

  const handleSelectedClass = async (classId) => {
    const email = user?.email;
    if (email) {
      try {
        const res = await axiosSecure.patch(`/classSelect/${classId}`, {
          email,
        });
        if (res.data?.modifiedCount === 0) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "You have already added!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (res.data?.modifiedCount === 1) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You have successfully selected",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error("Error selecting class:", error);
      }
    } else {
      navigate("/signin");
    }
  };

  return (
    <div key={item._id} className="card w-full bg-base-100 shadow-xl">
      <div
        className="h-60 w-full bg-cover bg-center rounded-t-2xl"
        style={{ backgroundImage: `url('${item.image}')` }}
      >
        {item?.seats - item?.enrolled > 0 ? (
          <p className="text-white bg-green-500 text-xl  px-3 py-1 rounded-br-2xl rounded-tl-2xl w-fit shadow-md">
            {existingEnrolled ? (
              <span className="font-semibold text-2xl">Enrolled</span>
            ) : (
              <>
                Available:{" "}
                <span className="font-semibold text-2xl">
                  {item?.seats - item?.enrolled}
                </span>
              </>
            )}
          </p>
        ) : (
          <div className="bg-black w-full h-full rounded-t-2xl bg-opacity-60 text-3xl sm:text-5xl font-bold text-gray-300 flex items-center justify-center">
            Sold Out
          </div>
        )}
      </div>
      <div className="card-body p-5">
        <h2 className="card-title">{item.name}</h2>
        <div className="card-actions justify-between mt-auto">
          <div className="flex flex-wrap gap-3 mb-3">
            <p className="flex gap-1 items-center bg-gray-200 rounded-full pr-2">
              <MdOutlinePeopleOutline className="text-3xl bg-gray-500 p-1 rounded-full text-white" />{" "}
              <span className="text-xl font-semibold">{item?.seats}</span>
            </p>
            <p className="flex gap-1 items-center bg-gray-200 rounded-full pr-2">
              <BiDollarCircle className="text-3xl bg-gray-500 p-1 rounded-full text-white" />{" "}
              <span className="text-xl font-semibold">{item?.price}</span>
            </p>
          </div>
          <p className="flex gap-1 items-center bg-gray-200 rounded-full pr-2">
            <FaChalkboardTeacher className="text-3xl bg-gray-500 p-1 rounded-full text-white" />{" "}
            <span className="text-xl font-semibold">{item?.instructor}</span>
          </p>
        </div>

        <div className="mt-auto">
          <hr />
          {existingEnrolled ? (
            ""
          ) : (
            <button
              onClick={() => handleSelectedClass(item._id)}
              className="btn btn-warning mt-3 hover:text-white font-bold hover:underline underline-offset-2"
              disabled={item?.seats - item?.enrolled <= 0}
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
