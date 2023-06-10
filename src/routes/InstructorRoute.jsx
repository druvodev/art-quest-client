import { Navigate, useLocation } from "react-router";
import { ScaleLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";
import useInstructor from "../hooks/useInstructor";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isInstructor, isInstructorLoading] = useInstructor();
  const location = useLocation();

  if (loading || isInstructorLoading) {
    return (
      <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
        <ScaleLoader color="#72deed" />
      </div>
    );
  }

  if (user && isInstructor) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
