import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";

const MyClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: classes = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure(`/instructor/classes/${user?.email}`);
      return res.data;
    },
  });

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-5">
        Total Classes: {classes.length}
      </h3>
      <div className="grid sm:grid-cols-3 gap-8">
        {classes.map((item) => (
          <div
            key={item._id}
            className={`card w-full bg-base-100 shadow-xl ${
              item?.status === "denied" && "border-2 border- border-rose-500"
            }`}
          >
            <div
              className="h-60 w-full bg-cover bg-center rounded-t-2xl"
              style={{ backgroundImage: `url('${item.image}')` }}
            >
              <div
                className={`px-3 py-1 mt-2 ml-2 rounded-full w-fit shadow-md text-white font-medium uppercase ${
                  item.status === "pending"
                    ? "bg-amber-500"
                    : item.status === "approved"
                    ? "bg-green-500"
                    : item.status === "denied"
                    ? "bg-rose-500"
                    : ""
                }`}
              >
                {item.status}
              </div>
            </div>
            <div className="card-body p-5">
              <h2 className="card-title">{item.name}</h2>
              <div className="card-actions justify-start">
                {item?.feedback ? (
                  <>
                    <button
                      className="btn btn-outline btn-sm rounded-full"
                      onClick={() => openModal(`my_modal_${item._id}`)}
                    >
                      <FiAlertCircle className="text-xl" /> Feedback
                    </button>
                    <dialog id={`my_modal_${item._id}`} className="modal">
                      <form method="dialog" className="modal-box">
                        <button
                          htmlFor={`my_modal_${item._id}`}
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                          onClick={() => {
                            const modal = document.getElementById(
                              `my_modal_${item._id}`
                            );
                            if (modal) {
                              modal.close();
                            }
                          }}
                        >
                          ✕
                        </button>
                        <h3 className="font-bold text-lg">Admin Messages!</h3>
                        <p className="py-4">{item.feedback}</p>
                      </form>
                    </dialog>
                  </>
                ) : (
                  ""
                )}
              </div>

              <div className="mt-auto">
                <hr />
                <div className="flex gap-5 mt-3">
                  <button className="btn btn-accent btn-sm">
                    {" "}
                    <FaEdit />
                    Update
                  </button>
                  <button className="btn btn-error btn-sm">
                    {" "}
                    <FaTrashAlt />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClasses;
