/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import InstructorCard from "./InstructorCard";
import HeaderName from "../../components/HeaderName";

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
  }, []);

  return (
    <div className="px-5 sm:px-10">
      <HeaderName name={"Instructors"} />
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
        {instructors.map((instructor) => (
          <InstructorCard key={instructor._id} instructor={instructor} />
        ))}
      </div>
    </div>
  );
};

export default Instructors;
