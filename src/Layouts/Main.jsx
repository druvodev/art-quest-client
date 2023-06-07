import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-427.68px)] bg-gray-100">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
