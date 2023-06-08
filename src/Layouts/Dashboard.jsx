import { Link, Outlet } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import {} from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  console.log(isAdmin);

  const elements = isAdmin ? (
    <>
      <li>
        <Link className="px-9 py-3 flex items-center gap-2  hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9]  duration-200">
          {" "}
          <FaUserCog className="text-2xl" />
          Manage Classes
        </Link>
      </li>
      <li>
        <Link className="px-9 py-3 flex items-center gap-2  hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9]  duration-200">
          {" "}
          <SiGoogleclassroom className="text-2xl" />
          Manage Users
        </Link>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link className="px-9 py-3 flex items-center gap-2  hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9]  duration-200">
          {" "}
          <SiGoogleclassroom className="text-2xl" />
          My Classes
        </Link>
      </li>
      <li>
        <Link className="px-9 py-3 flex items-center gap-2  hover:bg-[#26c6da] hover:text-white rounded-lg hover:shadow-md hover:shadow-[#cdf9ffe9]  duration-200">
          {" "}
          <GrAddCircle className="text-2xl" />
          Add a Class
        </Link>
      </li>
    </>
  );

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-[1520px] min-h-[calc(100vh-100px)] mx-auto p-10 rounded-3xl grid gap-5 grid-cols-5 bg-white shadow-sm">
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
                {isAdmin ? "Admin panel" : "Instructor  panel"}
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
