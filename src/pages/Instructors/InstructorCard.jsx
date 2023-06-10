import { SiMinutemailer } from "react-icons/si";

const InstructorCard = ({ instructor }) => {
  const emailLink = `mailto:${instructor.email}`;

  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl">
      <figure>
        <img
          className="w-full"
          src={
            instructor?.image
              ? instructor.image
              : "https://i.ibb.co/3smZYVQ/instructor.png"
          }
          alt="Shoes"
        />
      </figure>
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
          <button className="btn btn-info text-white">See Classes</button>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
