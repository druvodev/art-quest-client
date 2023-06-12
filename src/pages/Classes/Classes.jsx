/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ClassCard from "./ClassCard";
import HeaderName from "../../components/HeaderName";
import useEnrolledClasses from "../../hooks/useEnrolledClasses";
import useAuth from "../../hooks/useAuth";

const Classes = () => {
  const { user } = useAuth();
  const [classes, setPopularClasses] = useState([]);
  const [enrolledClasses] = useEnrolledClasses();
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure("/classes");
        setPopularClasses(res.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchData();
  }, []);

  let filteredClasses = classes;

  if (user && enrolledClasses.length > 0) {
    // Exclude enrolled classes if available
    const enrolledClassIds = enrolledClasses.map((classItem) => classItem._id);
    filteredClasses = classes.filter(
      (classItem) => !enrolledClassIds.includes(classItem._id)
    );
  }

  return (
    <div className="px-5 sm:px-10 pb-5 sm:pb-10">
      <HeaderName name={"Classes"} />
      <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-5">
        {filteredClasses.map((item) => (
          <ClassCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Classes;
