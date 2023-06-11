import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import { ScaleLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="text-center pt-20">
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
