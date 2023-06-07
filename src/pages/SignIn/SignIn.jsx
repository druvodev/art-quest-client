import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";

const SignIn = () => {
  const { signInUser, signInWithGoogle, setLoading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isShow, setIsShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const { email, password } = data;

    // Automatic remove error message
    if (errors) {
      setTimeout(() => {
        setError("");
      }, 5000);
    }

    // SignIn user with email and password and error checking
    signInUser(email, password)
      .then(() => {
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          return setError("Sorry, your password is incorrect!");
        } else if (error.message === "Firebase: Error (auth/user-not-found).") {
          return setError(
            "Email not found. Please try again or create a new account!"
          );
        } else {
          setError(error.message);
        }
      });
    setLoading(false);
  };

  const signInGoogle = () => {
    signInWithGoogle()
      .then(() => {
        navigate(from, { replace: true });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <div className="mx-auto py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        SignIn Your Account
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl mx-auto bg-white p-4 sm:p-8 rounded-md sm:shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("email", { required: true })}
            className={`w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#26c6da] ${
              errors.email && "border-red-500"
            }`}
            type="email"
            id="email"
            placeholder="xxxxx@example.com"
          />
          {errors.email && (
            <small className="text-red-500">Email is required</small>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <div className="w-full flex items-center gap-2 px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus-within:border-[#26c6da]">
            <input
              {...register("password", { required: true })}
              className={`outline-none w-full ${
                errors.password && "border-red-500"
              }`}
              type={isShow ? "text" : "password"}
              id="password"
              placeholder="******"
            />
            {isShow ? (
              <FaEye
                onClick={() => setIsShow(false)}
                className="w-5 h-5 text-gray-400"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setIsShow(true)}
                className="w-5 h-5 text-gray-400"
              />
            )}
          </div>
          {errors.password && (
            <small className="text-red-500">Password is required</small>
          )}
        </div>
        <div className="flex gap-10">
          <div>
            <input
              type="checkbox"
              name="remember-me"
              id="remember-me"
              className="mr-2"
            />
            <label htmlFor="remember-me" className="text-gray-500">
              Remember me
            </label>
          </div>
          <button className="font-semibold">Forgot Password?</button>
        </div>
        {error && (
          <p className="h-6">
            <small className="text-red-500 flex items-center gap-1">
              <CgDanger /> {error}
            </small>
          </p>
        )}
        <button
          className="w-full bg-[#26c6da] text-white text-lg font-bold py-3 px-4 my-2 rounded-md hover:bg-[#16b0c5] transition duration-300"
          type="submit"
        >
          Sign In
        </button>
        <div className="divider">OR</div>
        <ul className="flex gap-5 items-center justify-center mt-1 mb-4">
          <li
            onClick={() => signInGoogle()}
            className="w-full px-4 py-3 rounded-md shadow-md shadow-sky-200 border border-sky-100 flex
            hover:bg-gray-100 justify-center"
          >
            <img
              className="h-8"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/150px-Google_%22G%22_Logo.svg.png"
              alt="Google"
            />
          </li>
        </ul>
        <hr />
        <p className="text-center mt-2">
          Do not you have an account yet?{" "}
          <span className="text-[#26c6da] font-semibold underline underline-offset-2">
            <Link to={"/signUp"}>Sign Up</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
