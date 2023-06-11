import { Link, useRouteError } from "react-router-dom";
import { FaHome } from "react-icons/fa";
const ErrorPage = () => {
  const { error } = useRouteError();

  return (
    <section className="flex items-center h-screen p-16 bg-gray-100 text-gray-900">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className=" text-center">
          <img src="/404Error.svg" alt="404 svg" className="h-72 w-auto mb-8" />

          <p className="text-2xl font-semibold md:text-3xl mb-8">
            {error?.message}
          </p>
          <Link
            to="/"
            className="flex items-center mx-auto gap-2 w-fit px-8 py-3 font-semibold gradient text-white primary-bg"
          >
            <FaHome className="text-xl" /> Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
