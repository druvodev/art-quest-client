import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const signInGoogle = () => {
    signInWithGoogle().then((result) => {
      const loggedUser = result.user;
      const saveUser = {
        name: loggedUser.displayName,
        email: loggedUser.email,
        image: loggedUser?.photoURL,
      };
      console.log(loggedUser);

      console.log("user profile updated");

      axiosSecure
        .post("/users", saveUser)
        .then(() => {
          navigate(from, { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div className="flex gap-5 items-center justify-center mt-1 mb-4">
      <button
        onClick={() => signInGoogle()}
        className="w-full px-4 py-3 rounded-md shadow-md shadow-sky-200 border border-sky-100 flex
            hover:bg-gray-100 justify-center"
      >
        <img
          className="h-8"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/150px-Google_%22G%22_Logo.svg.png"
          alt="Google"
        />
      </button>
    </div>
  );
};

export default SocialLogin;
