import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ClassCard from "./ClassCard";
import HeaderName from "../../components/HeaderName";

const Classes = () => {
  const [classes, setPopularClasses] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure("/classes");
        setPopularClasses(res.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchData();
  }, [axiosSecure]);
  return (
    <div className="px-5 sm:px-10 pb-5 sm:pb-10">
      <HeaderName name={"Classes"} />
      <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-5">
        {classes.map((item) => (
          <ClassCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Classes;
