import { ScaleLoader } from "react-spinners";
import { MdWarning } from "react-icons/md";
import useEnrolledClasses from "../../../hooks/useEnrolledClasses";

const EnrolledClasses = () => {
  const [enrolledClasses, isLoading] = useEnrolledClasses();

  return (
    <div>
      {isLoading ? (
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
                      <div className="rounded-xl w-36 h-36">
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

                        <hr />
                        <p>
                          <span className="font-semibold">Instructor:</span>{" "}
                          {item.instructor}
                        </p>
                        <p>
                          <span className="font-semibold">Enrolled Time:</span>{" "}
                          {new Date(item.enrolledTime * 1000).toLocaleString()}
                        </p>
                        <p>
                          <span className="font-semibold">Serial:</span>{" "}
                          {item.enrolled}
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
