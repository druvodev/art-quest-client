import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { ScaleLoader } from "react-spinners";
import { MdWarning } from "react-icons/md";

const EnrolledClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      try {
        const response = await axiosSecure.get(
          `/enrolledClasses/${user?.email}`
        );
        const data = response.data;
        setEnrolledClasses(data);
      } catch (error) {
        console.error("Error fetching enrolled classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledClasses();
  }, [axiosSecure, user]);

  return (
    <div>
      {loading ? (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
          <ScaleLoader color="#72deed" />
        </div>
      ) : (
        <table className="overflow-x-auto table">
          {enrolledClasses.length <= 0 ? (
            <p className="text-xl font-semibold flex items-center">
              <MdWarning className="text-amber-500" /> You have not enrolled any
              classes.
            </p>
          ) : (
            enrolledClasses.map((item) => (
              <tr key={item.key}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="rounded-xl w-48 h-48">
                        <img src={item.image} alt="photo" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-xl sm:text-2xl">
                        {item.name}
                      </div>
                      <div>
                        <p className="text-base">
                          <span className="font-semibold">Price:</span> $
                          {item.price}
                        </p>
                        <p className="text-base">
                          <span className="font-semibold">Seats:</span>{" "}
                          {item.seats}
                        </p>
                        <hr />
                        <p>
                          <span className="font-semibold">Instructor:</span>{" "}
                          {item.instructor}
                        </p>
                        <p>
                          <span className="font-semibold">Enrolled Time:</span>{" "}
                          {new Date(item.enrolledTime * 1000).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          )}
        </table>
      )}
    </div>
  );
};

export default EnrolledClasses;
