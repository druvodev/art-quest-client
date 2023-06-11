import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import InstructorCard from "./InstructorCard";

const Instructors = () => {
  const [axiosSecure] = useAxiosSecure();
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure(`/instructors/`);
        setInstructors(res.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  return (
    <div className="px-5 sm:px-10 pt-4 sm:pt-10">
      <h3 className="text-3xl text-center font-bold mb-5 underline underline-offset-4">
        Instructors
      </h3>
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
        {instructors.map((instructor) => (
          <InstructorCard key={instructor._id} instructor={instructor} />
        ))}
      </div>
    </div>
  );
};

export default Instructors;
