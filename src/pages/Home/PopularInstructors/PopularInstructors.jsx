import { useEffect, useState } from "react";

const PopularInstructors = () => {
  const [popularInstructors, setPopularInstructors] = useState([]);

  useEffect(() => {
    const fetchPopularInstructors = async () => {
      try {
        const res = await fetch("http://localhost:5000/popularInstructors");
        if (res.ok) {
          const data = await res.json();
          setPopularInstructors(data);
        } else {
          console.error("Error fetching popular instructors:", res.status);
        }
      } catch (error) {
        console.error("Error fetching popular instructors:", error);
      }
    };

    fetchPopularInstructors();
  }, []);

  return (
    <div>
      <h3 className="text-4xl text-center font-bold mt-12 mb-5 underline underline-offset-4">
        Popular Instructor
      </h3>
      <div className="grid sm:grid-cols-2 gap-5">
        {popularInstructors.map((instructor) => (
          <div key={instructor?.email} className="hero bg-base-300 rounded-3xl">
            <div className="hero-content flex-col lg:flex-row">
              <img
                src="https://i.ibb.co/gggHL9V/instructor.png"
                className=" w-60 rounded-lg "
              />
              <div>
                <h1 className="text-3xl font-bold">{instructor.name}</h1>
                <p className="text-xl">
                  Total Classes: <span>{instructor.totalClasses}</span>
                </p>
                <p className="text-xl">
                  Total Students: <span>{instructor.totalStudents}</span>
                </p>
                <button className="btn btn-primary mt-5">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructors;
