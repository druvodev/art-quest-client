import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import { ScaleLoader } from "react-spinners";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
        <ScaleLoader color="#72deed" />
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
