import { Navigate, useLocation } from "react-router";
import { ScaleLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";
import useStudent from "../hooks/useStudent";

const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isStudent, isStudentLoading] = useStudent();
  const location = useLocation();

  if (loading || isStudentLoading) {
    return (
      <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
        <ScaleLoader color="#72deed" />
      </div>
    );
  }

  if (user && isStudent) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default StudentRoute;
