import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import SocialLogin from "../Shared/SocialLogin";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SignUp = () => {
  const { createUser, setLoading } = useContext(AuthContext);
  const [firstIsShow, setFirstIsShow] = useState(false);
  const [secondIsShow, setSecondIsShow] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [error, setError] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Automatic remove error message
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  // Register With Email & Password
  const handleEmailRegister = (data) => {
    const { name, profilePhoto, email, password, confirmPassword } = data;

    // Check password validation
    if (password !== confirmPassword) {
      return setError("Passwords don't match.");
    }

    // Check terms and condition field
    if (!isTermsChecked) {
      return setError("Please agree to the terms and conditions.");
    }

    // Create a new user with email
    createUser(email, password)
      .then((result) => {
        updateName(result.user, name, profilePhoto);

        // upload user info in our database
        const saveUser = {
          name: name,
          email: email,
          image: profilePhoto,
        };
        axiosSecure.post("/users", saveUser).catch((error) => {
          console.log(error);
        });

        navigate("/signin");
        console.log(result.user);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });

    reset();
  };

  // Update user name and photo URL
  const updateName = (user, userName, profilePhoto) => {
    updateProfile(user, {
      displayName: userName,
      photoURL: profilePhoto,
    });
  };

  return (
    <div className="mx-auto py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        SignUp Your Account
      </h1>
      <div className="w-full max-w-xl mx-auto bg-white p-4 sm:p-8 rounded-md sm:shadow-md">
        <form onSubmit={handleSubmit(handleEmailRegister)}>
          <div className="mb-4">
            <label
              className="block text-gray-700  font-bold mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#26c6da]"
              type="text"
              id="name"
              placeholder="Prodip Karati"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700  font-bold mb-1"
              htmlFor="profilePhoto"
            >
              Photo Url
            </label>
            <input
              {...register("profilePhoto", {
                required: "PhotoURL is required",
              })}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#26c6da]"
              type="text"
              id="profilePhoto"
              placeholder="https://example.com/user/profile.jpg"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700  font-bold mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#26c6da]"
              type="email"
              id="email"
              placeholder="prodip@example.com"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700  font-bold mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="w-full flex items-center gap-2 px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus-within:border-[#26c6da]">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
                  },
                })}
                className="outline-none w-full"
                type={firstIsShow ? "text" : "password"}
                id="password"
                placeholder="******"
              />
              {firstIsShow ? (
                <FaEye
                  onClick={() => setFirstIsShow(false)}
                  className="w-5 h-5 text-gray-400"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setFirstIsShow(true)}
                  className="w-5 h-5 text-gray-400"
                />
              )}
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700  font-bold mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="w-full flex items-center gap-2 px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus-within:border-[#26c6da]">
              <input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                className="outline-none w-full"
                type={secondIsShow ? "text" : "password"}
                id="confirmPassword"
                placeholder="******"
              />
              {secondIsShow ? (
                <FaEye
                  onClick={() => setSecondIsShow(false)}
                  className="w-5 h-5 text-gray-400"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setSecondIsShow(true)}
                  className="w-5 h-5 text-gray-400"
                />
              )}
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="mb-6">
            <div className="flex items-center">
              <input
                {...register("terms", { required: true })}
                type="checkbox"
                id="terms"
                checked={isTermsChecked}
                onChange={(e) => setIsTermsChecked(e.target.checked)}
                className="form-checkbox h-4 w-4 text-[#26c6da] focus:ring-[#26c6da] border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-[#26c6da] hover:underline transition duration-300"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
            {errors.terms && (
              <span className="text-red-500">Please agree to the terms.</span>
            )}
          </div>
          <div className="mb-4">
            {error && (
              <div className="flex items-center bg-red-100 p-3 mb-3 rounded-md">
                <CgDanger className="text-red-500 mr-2" />
                <span className="text-red-500">{error}</span>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-[#26c6da] py-3 px-6 text-white rounded-md font-bold hover:bg-[#0097a7] transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="divider">OR</div>
        <SocialLogin />
        <hr />
        <div className="flex items-center justify-center mt-4">
          <p className="text-gray-800">
            Already have an account?{" "}
            <Link
              to="/signIn"
              className="text-[#26c6da] hover:underline transition duration-300"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
