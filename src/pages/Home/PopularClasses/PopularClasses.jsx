import { BiDollarCircle } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PopularClasses = () => {
  const [popularClasses, setPopularClasses] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure("/popularClasses");
        setPopularClasses(res.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchData();
  }, [axiosSecure]);
  return (
    <div>
      <h3 className="text-4xl text-center font-bold mt-12 mb-5 underline underline-offset-4">
        Popular Classes
      </h3>
      <div className="grid sm:grid-cols-3 gap-5">
        {popularClasses.map((item) => (
          <div key={item._id} className="card w-full bg-base-100 shadow-xl">
            <div
              className="h-60 w-full bg-cover bg-center rounded-t-2xl"
              style={{ backgroundImage: `url('${item.image}')` }}
            >
              {item?.seats - item?.enrolled > 0 ? (
                <p className="text-white bg-green-500 text-xl  px-3 py-1 rounded-br-2xl rounded-tl-2xl w-fit shadow-md">
                  Available:{" "}
                  <span className="font-semibold text-2xl">
                    {item?.seats - item?.enrolled}
                  </span>
                </p>
              ) : (
                <div className="bg-black w-full h-full rounded-t-2xl bg-opacity-60 text-4xl sm:text-5xl font-bold text-gray-300 flex items-center justify-center">
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
                  <p className="flex gap-1 items-center bg-sky-200 rounded-full pr-2">
                    <FaChalkboardTeacher className="text-3xl bg-sky-500 p-1 rounded-full text-white" />{" "}
                    <span className="text-xl font-semibold">
                      {item?.instructor}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <hr />
                <button
                  className="btn btn-warning mt-3 hover:text-white font-bold hover:underline underline-offset-2"
                  disabled={item?.seats - item?.enrolled <= 0}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
