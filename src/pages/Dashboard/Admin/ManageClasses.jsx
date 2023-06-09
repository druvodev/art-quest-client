import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CgMenuOreos } from "react-icons/cg";
import useAdminClasses from "../../../hooks/useAdminClasses";
import ClassCard from "./ClassCard";

const ManageClasses = () => {
  const [classes, , isLoading] = useAdminClasses();
  const [showStats, setShowStats] = useState(false); // State to toggle showing stats
  const totalPending = classes.filter(
    (user) => user.status === "pending"
  ).length;
  const totalApproved = classes.filter(
    (user) => user.status === "approved"
  ).length;
  const totalDenied = classes.filter((user) => user.status === "denied").length;
  const totalClasses = classes.length;

  const handleMenu = () => {
    setShowStats(!showStats); // Toggle the showStats state
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-5 py-3">
        <form action="#">
          <div className="relative">
            <div className="flex absolute inset-y-0 left-3 items-center pl-3">
              <BiSearch className="text-2xl text-gray-400" />
            </div>
            <input
              className="block p-3 pl-14 w-96 rounded-full border bg-gray-100
              border-none placeholder-gray-400 text-gray-800 outline-sky-300 font-medium tracking-wide"
              placeholder="Search"
              type="text"
              id=""
            />
          </div>
        </form>
        <button onClick={handleMenu} className="btn text-2xl">
          <CgMenuOreos />
        </button>
      </div>
      {showStats && (
        <div className="absolute z-10 modal-box text-xl">
          <p className="text-2xl">
            Total Classes:{" "}
            <span className="text-2xl font-bold">{totalClasses}</span>
          </p>
          <hr />
          <p className="mt-3">
            Approved:{" "}
            <span className="text-2xl font-bold">{totalApproved}</span>
          </p>
          <p>
            Denied: <span className="text-2xl font-bold">{totalDenied}</span>
          </p>
          <p>
            Pending: <span className="text-2xl font-bold">{totalPending}</span>
          </p>
        </div>
      )}
      <table className="overflow-x-auto table">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          classes.map((item) => <ClassCard key={item._id} item={item} />)
        )}
      </table>
    </div>
  );
};

export default ManageClasses;
