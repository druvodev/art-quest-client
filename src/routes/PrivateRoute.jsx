import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import { ScaleLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
        <ScaleLoader color="#72deed" />
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/signin" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
