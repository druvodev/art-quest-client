import { NavLink, Outlet } from "react-router-dom";
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
            <NavLink
              to="/dashboard/classes"
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : "px-9 py-3 flex items-center gap-2 hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9] duration-200"
              }
            >
              <SiGoogleclassroom className="text-2xl" />
              Manage Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : "px-9 py-3 flex items-center gap-2 hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9] duration-200"
              }
            >
              <FaUsersCog className="text-2xl" />
              Manage Users
            </NavLink>
          </li>
        </>
      )}

      {isInstructor && (
        <>
          {/* Elements for instructor */}
          <li>
            <NavLink
              to="/dashboard/myclasses"
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : "px-9 py-3 flex items-center gap-2 hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9] duration-200"
              }
            >
              <SiGoogleclassroom className="text-2xl" />
              My Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/addclass"
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : "px-9 py-3 flex items-center gap-2 hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9] duration-200"
              }
            >
              <MdOutlineAddToPhotos className="text-2xl" />
              Add a Class
            </NavLink>
          </li>
        </>
      )}

      {isStudent && (
        <>
          {/* Elements for Students */}
          <li>
            <NavLink
              to="/dashboard/selectedClasses"
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : "px-9 py-3 flex items-center gap-2 hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9] duration-200"
              }
            >
              <BiSelection className="text-2xl" />
              Selected Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/enrolledClasses"
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : "px-9 py-3 flex items-center gap-2 hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9] duration-200"
              }
            >
              <BiSelectMultiple className="text-2xl" />
              Enrolled Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/paymentHistory"
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : "px-9 py-3 flex items-center gap-2 hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9] duration-200"
              }
            >
              <BiHistory className="text-2xl" />
              Payment History
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-[1520px] min-h-[calc(100vh-100px)] mx-auto p-10 rounded-3xl grid gap-5 grid-cols-5 bg-white shadow-sm relative">
        <div className="col-span-1">
          <div className="text-md font-medium text-neutral-600">
            <NavLink to={"/"} className="btn btn-ghost normal-case text-xl">
              <div className="flex gap-2 items-center">
                <img
                  className="h-11 rounded-full hidden sm:block"
                  src="https://i.ibb.co/FV3xBby/codepen.png"
                  alt=""
                />
                <span>
                  Art<span className="primary-text ml-1">Quest</span>
                </span>
              </div>
            </NavLink>
            <div>
              <p className="mt-8 text-neutral-500">
                {isAdmin
                  ? "Admin panel"
                  : isInstructor
                  ? "Instructor panel"
                  : isStudent && "Student panel"}
              </p>
              <ul className="flex gap-1 flex-col mt-5">{elements}</ul>
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
