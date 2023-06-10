import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PopularInstructors = () => {
  const [popularInstructors, setPopularInstructors] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure("/popularInstructors");
        setPopularInstructors(res.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  return (
    <div>
      <h3 className="text-4xl text-center font-bold mt-12 mb-5 underline underline-offset-4">
        Popular Instructor
      </h3>
      <div className="grid sm:grid-cols-2 gap-5">
        {popularInstructors.map((instructor) => (
          <div
            key={instructor.email}
            className="card lg:card-side bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="w-full bg-gray-400"
                src="https://i.ibb.co/3smZYVQ/instructor.png"
                alt="Instructor Photo"
              />
            </figure>
            <div className="card-body">
              <h2 className="text-3xl font-semibold">{instructor.name}</h2>
              <hr />
              <div className="w-fit">
                <p className="font-semibold flex items-center justify-between gap-2">
                  Total Classes:{" "}
                  <span className="text-3xl font-bold flex items-center justify-center">
                    {instructor.totalClasses}
                  </span>
                </p>
                <p className="font-semibold flex items-center justify-between gap-2">
                  Total Students:{" "}
                  <span className="text-3xl font-bold flex items-center justify-center">
                    {instructor.totalStudents}
                  </span>
                </p>
              </div>
              <div className="card-actions justify-end mt-auto">
                <button className="bg-cyan-500 py-3 px-6 font-semibold text-white">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructors;
