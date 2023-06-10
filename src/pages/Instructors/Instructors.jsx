import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import InstructorCard from "./InstructorCard";

const Instructors = () => {
  const [axiosSecure] = useAxiosSecure();
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure("/instructors");
        setInstructors(res.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  return (
    <div className="grid sm:grid-cols-3 gap-6 pt-12">
      {instructors.map((instructor) => (
        <InstructorCard key={instructor._id} instructor={instructor} />
      ))}
    </div>
  );
};

export default Instructors;
