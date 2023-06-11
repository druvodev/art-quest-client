/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import HeaderName from "../../../components/HeaderName";

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
  }, []);
  console.log(popularInstructors);
  return (
    <section>
      <HeaderName name={"Popular Instructor"} />
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {popularInstructors.map((instructor) => (
          <div
            key={instructor.email}
            className="card lg:card-side bg-base-100 shadow-xl"
          >
            <figure className="bg-gray-400">
              <img
                className="w-48"
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
    </section>
  );
};

export default PopularInstructors;
