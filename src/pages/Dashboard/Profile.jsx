import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";
import useInstructor from "../../hooks/useInstructor";
import useStudent from "../../hooks/useStudent";

const Profile = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [isStudent] = useStudent();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        {user.photoURL && (
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={
              user?.photoURL
                ? user.photoURL
                : "https://i.ibb.co/Ws1r9fp/images.png"
            }
            alt="Profile Photo"
          />
        )}
        <h1 className="text-2xl font-bold">
          Welcome to Your Profile Dashboard, {user.displayName}!
        </h1>
      </div>

      <p className="text-lg mb-4">
        <span className="font-bold">Email:</span> {user.email}
      </p>
      <p className="text-lg mb-4">
        <span className="font-bold">Role:</span>{" "}
        {(isAdmin && "Admin") ||
          (isInstructor && "Instructor") ||
          (isStudent && "Student")}
      </p>
      <button className="btn btn-sm btn-info text-white">Update</button>
    </div>
  );
};

export default Profile;
