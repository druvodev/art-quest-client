import { NavLink, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const [signIn, setSignIn] = useState(location.pathname === "/signIn");

  const toggleSignIn = () => {
    setSignIn(!signIn);
  };

  const elements = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "underline underline-offset-4 text-[#26c6da] font-bold"
              : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li tabIndex={0}>
        <NavLink
          to={"/instructors"}
          className={({ isActive }) =>
            isActive
              ? "underline underline-offset-4 text-[#26c6da] font-bold"
              : ""
          }
        >
          Instructors
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/classes"}
          className={({ isActive }) =>
            isActive
              ? "underline underline-offset-4 text-[#26c6da] font-bold"
              : ""
          }
        >
          Classes
        </NavLink>
      </li>
      {user?.email && (
        <li>
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 text-[#26c6da] font-bold"
                : ""
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar h-[80px] border-b-2">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-base z-50"
          >
            {elements}
          </ul>
        </div>
        <NavLink to={"/"} className="btn btn-ghost normal-case text-xl">
          <img
            className="h-full rounded-full hidden sm:block"
            src="https://i.ibb.co/FV3xBby/codepen.png"
            alt=""
          />
          Art<span className="primary-text">Quest</span>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base">{elements}</ul>
      </div>
      <div className="navbar-end  ">
        {user ? (
          <div className="flex gap-3">
            <div className="btn btn-ghost btn-circle avatar">
              <div className="w-12 rounded-full ">
                <img
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://i.ibb.co/Ws1r9fp/images.png"
                  }
                />
              </div>
            </div>
            <span
              onClick={() => logOut()}
              className="bg-rose-50 text-red-500 hover:bg-rose-100 w-12 h-12 text-2xl rounded-full flex items-center justify-center cursor-pointer shadow-md"
            >
              <FiLogOut />
            </span>
          </div>
        ) : !signIn ? (
          <NavLink
            onClick={() => toggleSignIn()}
            to={"/signIn"}
            className="border border-[#26c6da] bg-[#26c6da] text-white font-semibold rounded-md px-4 py-2 text-lg"
          >
            Sign In
          </NavLink>
        ) : (
          <NavLink
            onClick={() => toggleSignIn()}
            to={"/signUp"}
            className="border border-[#26c6da] hover:bg-[#26c6da] hover:text-white duration-200 font-semibold rounded-md px-4 py-2 text-lg"
          >
            Sign Up
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
