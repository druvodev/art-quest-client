import { SiMinutemailer } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const InstructorCard = ({ instructor }) => {
  const emailLink = `mailto:${instructor.email}`;
  const navigate = useNavigate();

  const handleClasses = (email) => {
    navigate(`/instructor/${email}`);
  };

  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl">
      <figure
        className="bg-cover bg-center h-60"
        style={{
          backgroundImage: `url(${
            instructor?.image || "https://i.ibb.co/3smZYVQ/instructor.png"
          })`,
        }}
      ></figure>
      <hr />
      <div className="card-body">
        <h2 className="card-title">{instructor.name}</h2>
        <p
          title="Click Me"
          className="flex items-center border w-fit pr-5 rounded-full"
        >
          <SiMinutemailer className="text-3xl p-1 bg-gray-600 rounded-full text-white mr-2" />{" "}
          <a href={emailLink}>{instructor.email}</a>
        </p>
        <p className="text-base">
          {instructor.totalClasses <= 0 ? (
            <span className="text-rose-500">No Classes Found</span>
          ) : (
            <span className="flex items-center gap-2">
              Number of Classes:{" "}
              <span className="text-2xl font-bold">
                {instructor.totalClasses}
              </span>
            </span>
          )}
        </p>

        <div className="card-actions justify-end">
          <button
            onClick={() => handleClasses(instructor?.email)}
            className="btn btn-info text-white"
            disabled={instructor.totalClasses <= 0}
          >
            See Classes
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
