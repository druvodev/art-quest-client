import { useState } from "react";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAdminClasses from "../../../hooks/useAdminClasses";
import { FaTrashAlt } from "react-icons/fa";

const ClassCard = ({ item }) => {
  const [axiosSecure] = useAxiosSecure();
  const [, refetch] = useAdminClasses();

  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFeedback("");
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const approveClass = async () => {
    try {
      await axiosSecure.patch(`/admin/class/${item._id}`, {
        method: "approve",
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const denyClass = async () => {
    try {
      await axiosSecure.patch(`/admin/class/${item._id}`, {
        method: "deny",
        feedback: feedback,
      });
      refetch();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const isFeedbackEmpty = feedback.trim() === "";

  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="rounded-xl w-48 h-48">
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
              <p>
                <span className="font-semibold">Email:</span> {item.email}
              </p>
            </div>

            <div className="mt-3">
              <span
                className={`badge ${
                  item.status === "pending"
                    ? "badge-warning"
                    : item.status === "approved"
                    ? "badge-success"
                    : item.status === "denied"
                    ? "badge-error"
                    : ""
                } text-white text-lg uppercase`}
              >
                {item.status}
              </span>
            </div>
          </div>
        </div>
      </td>

      <td>
        {item?.status === "approved" ? (
          <button
            onClick={openModal}
            className="btn btn-sm btn-error hover:text-white font-semibold hover:underline underline-offset-2"
          >
            Deny
          </button>
        ) : item?.status === "pending" ? (
          <div className="flex gap-5">
            <button
              onClick={approveClass}
              className="px-5 py-2 btn btn-sm btn-success border hover:text-white font-semibold hover:underline underline-offset-2 duration-200 rounded-md shadow-md"
            >
              Approve
            </button>
            <button
              onClick={openModal}
              className="btn btn-sm btn-error hover:text-white font-semibold hover:underline underline-offset-2"
            >
              Deny
            </button>
          </div>
        ) : (
          <div className="flex gap-5">
            <button
              onClick={approveClass}
              className="px-5 py-2 btn btn-sm btn-success border hover:text-white font-semibold hover:underline underline-offset-2 duration-200 rounded-md shadow-md"
            >
              Approve
            </button>{" "}
            <button className="btn btn-sm bg-rose-500 text-white hover:text-rose-500 hover:bg-rose-200">
              <FaTrashAlt />
            </button>
          </div>
        )}
      </td>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="modal-box text-base">
            <h2 className="text-xl font-semibold mb-4">Your Feedback</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter feedback"
              value={feedback}
              onChange={handleFeedbackChange}
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 mr-2 rounded-md border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={denyClass}
                className={`px-4 py-2 rounded-md bg-red-500 text-white ${
                  isFeedbackEmpty ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isFeedbackEmpty}
              >
                Deny Class
              </button>
            </div>
          </div>
        </div>
      )}
    </tr>
  );
};

export default ClassCard;
