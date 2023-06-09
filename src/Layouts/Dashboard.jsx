import { Link, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { FaUsersCog } from "react-icons/fa";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import useInstructor from "../hooks/useInstructor";
import { BiHistory, BiSelectMultiple, BiSelection } from "react-icons/bi";
import { useEffect, useState } from "react";
import useStudent from "../hooks/useStudent";

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isInstructor, isInstructorLoading] = useInstructor();
  const [isStudent, isStudentLoading] = useStudent();
  console.log("admin:", isAdmin, "ins:", isInstructor, "st:", isStudent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminLoading && !isInstructorLoading && !isStudentLoading) {
      setLoading(false);
    }
  }, [isAdminLoading, isInstructorLoading, isStudentLoading]);

  const elements = loading ? (
    // Render loading state or spinner
    <p>Loading...</p>
  ) : (
    <>
      {isAdmin && (
        <>
          {/* Elements for admin */}
          <li>
            <Link
              to="/dashboard/classes"
              className="px-9 py-3 flex items-center gap-2 hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9] duration-200"
            >
              <SiGoogleclassroom className="text-2xl" />
              Manage Classes
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/users"
              className="px-9 py-3 flex items-center gap-2 hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9] duration-200"
            >
              <FaUsersCog className="text-2xl" />
              Manage Users
            </Link>
          </li>
        </>
      )}

      {isInstructor && (
        <>
          {/* Elements for instructor */}
          <li>
            <Link
              to="/dashboard/myclasses"
              className="px-9 py-3 flex items-center gap-2 hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9] duration-200"
            >
              <SiGoogleclassroom className="text-2xl" />
              My Classes
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/addclass"
              className="px-9 py-3 flex items-center gap-2 hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9] duration-200"
            >
              <MdOutlineAddToPhotos className="text-2xl" />
              Add a Class
            </Link>
          </li>
        </>
      )}

      {isStudent && (
        <>
          {/* Elements for Students */}
          <li>
            <Link className="px-9 py-3 flex items-center gap-2 hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9] duration-200">
              <BiSelection className="text-2xl" />
              Selected Classes
            </Link>
          </li>
          <li>
            <Link className="px-9 py-3 flex items-center gap-2 hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9] duration-200">
              <BiSelectMultiple className="text-2xl" />
              Enrolled Classes
            </Link>
          </li>
          <li>
            <Link className="px-9 py-3 flex items-center gap-2 hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9] duration-200">
              <BiHistory className="text-2xl" />
              Payment History
            </Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-[1520px] min-h-[calc(100vh-100px)] mx-auto p-10 rounded-3xl grid gap-5 grid-cols-5 bg-white shadow-sm relative">
        <div className="col-span-1">
          <div className="text-lg font-medium text-neutral-600">
            <Link to={"/"} className="btn btn-ghost normal-case text-xl">
              <img
                className="h-full rounded-full hidden sm:block"
                src="https://i.ibb.co/FV3xBby/codepen.png"
                alt=""
              />
              Art<span className="primary-text">Quest</span>
            </Link>
            <div>
              <p className="mt-8 text-neutral-500">
                {isAdmin
                  ? "Admin panel"
                  : isInstructor
                  ? "Instructor panel"
                  : isStudent && "Student panel"}
              </p>
              <ul className="flex flex-col mt-5">{elements}</ul>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
