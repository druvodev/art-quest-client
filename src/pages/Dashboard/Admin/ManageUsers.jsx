import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUsers from "../../../hooks/useUsers";
import { BiSearch } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";

const ManageUsers = () => {
  const [users, refetch] = useUsers();
  const [axiosSecure] = useAxiosSecure();
  console.log(users);
  const totalStudents = users.filter((user) => user.role === "student").length;
  const totalInstructors = users.filter(
    (user) => user.role === "instructor"
  ).length;

  // Make New Admin Role
  const makeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin/${user._id}`)
          .then((response) => {
            console.log(response.data);
            if (response.data.modifiedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is now an admin!`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  // Generate New Admin Role
  const makeInstructor = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make instructor",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/instructor/${user._id}`)
          .then((response) => {
            console.log(response.data);
            if (response.data.modifiedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is now an instructor!`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
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
        <div className="flex gap-3 text-xl font-medium text-gray-600">
          <span className="bg-gray-100 px-5 py-3 rounded-full">
            Students: {totalStudents}
          </span>
          <span className="bg-gray-100 px-5 py-3 rounded-full">
            Instructors: {totalInstructors}
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-slate-400 text-white text-base">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  {user.name}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user.email}
                  </span>
                </td>
                <td className="uppercase font-semibold"> {user?.role}</td>
                <td>
                  {user.role === "student" ? (
                    <div className="flex gap-5">
                      <button
                        onClick={() => makeAdmin(user)}
                        className="btn btn-warning btn-sm hover:text-white font-semibold hover:underline "
                      >
                        <MdOutlineAdminPanelSettings className="text-xl" />
                        Admin
                      </button>
                      <button
                        onClick={() => makeInstructor(user)}
                        className="btn btn-info btn-sm hover:text-white font-semibold hover:underline "
                      >
                        <FaChalkboardTeacher className="text-xl" />
                        Instructor
                      </button>
                    </div>
                  ) : user.role === "instructor" ? (
                    <button
                      onClick={() => makeAdmin(user)}
                      className="btn btn-warning btn-sm hover:text-white font-semibold hover:underline "
                    >
                      <MdOutlineAdminPanelSettings className="text-xl" />
                      Admin
                    </button>
                  ) : (
                    <span>No Action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
