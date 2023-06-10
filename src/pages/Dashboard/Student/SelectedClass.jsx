import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { MdWarning } from "react-icons/md";
import { ScaleLoader } from "react-spinners";
import ClassCard from "./ClassCard";

const SelectedClass = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSelectedClasses = async () => {
      try {
        const response = await axiosSecure.get(
          `/selectedClasses/${user?.email}`
        );
        const data = response.data;
        setSelectedClasses(data);
      } catch (error) {
        console.error("Error fetching selected classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSelectedClasses();
  }, [axiosSecure, user]);

  return (
    <div>
      {loading ? (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
          <ScaleLoader color="#72deed" />
        </div>
      ) : (
        <table className="overflow-x-auto table">
          {selectedClasses.length <= 0 ? (
            <p className="text-xl font-semibold flex items-center">
              <MdWarning className="text-amber-500" /> You have not added any
              classes.
            </p>
          ) : (
            selectedClasses.map((item) => (
              <ClassCard key={item._id} item={item} />
            ))
          )}
        </table>
      )}
    </div>
  );
};

export default SelectedClass;
