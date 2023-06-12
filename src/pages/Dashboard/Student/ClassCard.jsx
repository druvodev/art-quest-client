import { FaTrashAlt } from "react-icons/fa";

import useSelectedClasses from "../../../hooks/useSelectedClasses";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useEnrolledClasses from "../../../hooks/useEnrolledClasses";
import Swal from "sweetalert2";

const ClassCard = ({ item }) => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [, refetch] = useSelectedClasses();
  const [enrolledClasses] = useEnrolledClasses();
  const navigate = useNavigate();

  const removeClass = async (classId) => {
    try {
      await axiosSecure.delete(`/removeClass/${classId}`, {
        data: { email: user.email },
      });
      refetch();
    } catch (error) {
      console.error("Error removing class:", error);
    }
  };

  const handlePayment = (id) => {
    const existingEnrolled = enrolledClasses.find(
      (enrolledClass) => enrolledClass._id === id
    );
    if (!existingEnrolled || !existingEnrolled) {
      return navigate(`/dashboard/payment/${id}`);
    }
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "You have already enrolled!",
      showConfirmButton: false,
      timer: 1500,
    });
    // Redirect to /dashboard/selectedClasses
    navigate("/dashboard/selectedClasses");
  };

  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="rounded-xl w-36 h-36">
              <img src={item.image} alt="photo" />
            </div>
          </div>
          <div>
            <div className="font-bold text-xl sm:text-2xl">{item.name}</div>
            <div>
              <p className="text-base">
                <span className="font-semibold">Price:</span> ${item.price}
              </p>
              <p className="text-base">
                <span className="font-semibold">Seats:</span> {item.seats}
              </p>
              <hr />
              <p>
                <span className="font-semibold">Instructor:</span>{" "}
                {item.instructor}
              </p>
            </div>
          </div>
        </div>
      </td>

      <td>
        <>
          <button
            onClick={() => handlePayment(item._id)}
            className="btn btn-warning hover:text-white font-semibold hover:underline underline-offset-2"
          >
            Pay
          </button>

          <button
            onClick={() => removeClass(item._id)}
            className="btn bg-rose-500 text-white hover:text-rose-500 hover:bg-rose-200 ml-5"
          >
            <FaTrashAlt />
          </button>
        </>
      </td>
    </tr>
  );
};

export default ClassCard;
