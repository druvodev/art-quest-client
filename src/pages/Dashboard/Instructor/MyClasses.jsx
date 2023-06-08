import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const MyClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: classes = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure(`/instructor/classes/${user?.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h3 className="text-xl font-semibold mb-5">
        Total Classes: {classes.length}
      </h3>
      <div className="grid sm:grid-cols-3 gap-8">
        {classes.map((item) => (
          <div key={item._id} className="card w-full bg-base-100 shadow-xl">
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
                    : item.status === "denied "
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
                  <div className="px-3 py-1 rounded-full font-medium border border-gray-500">
                    {item.feedback}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex gap-5 mt-auto">
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
        ))}
      </div>
    </div>
  );
};

export default MyClasses;
