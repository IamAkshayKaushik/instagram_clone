/* Instagram Sign Up Page with tailwindcss */

import { useState, useEffect } from "react";
import UserService from "../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { getAPIUrl } from "../conf/conf";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { fetchData } = UserService;
  const navigate = useNavigate();

  // Constants
  const USERNAME_PLACEHOLDER = "Username";
  const PASSWORD_PLACEHOLDER = "Password";

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let options = {
        method: "POST",
        body: JSON.stringify({ username, password }),
      };
      const user = await fetchData(getAPIUrl("signup"), options);
      if (user) {
        navigate("/");
      }
      setError("Something went wrong, Either change username or try again later.");
    } catch (error) {
      setError(error);
    }
  };

  // Reset error on username or password change
  useEffect(() => {
    setError(null);
  }, [username, password]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
          Create a new account
        </div>
        <div className="mt-8">
          <form action="#" autoComplete="off" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <label htmlFor="sign-in-username" className="sr-only">
                {USERNAME_PLACEHOLDER}
              </label>

              <input
                type="text"
                id="sign-in-username"
                className="h-10 w-full pl-4 px-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:border-indigo-700"
                placeholder={USERNAME_PLACEHOLDER}
                onChange={handleUsernameChange}
                value={username}
              />
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="sign-in-password" className="sr-only">
                {PASSWORD_PLACEHOLDER}
              </label>
              <input
                type="password"
                id="sign-in-password"
                className="h-10 w-full px-2 pl-4 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:border-indigo-700"
                placeholder={PASSWORD_PLACEHOLDER}
                onChange={handlePasswordChange}
                value={password}
              />
              {/* <div className="flex relative "> */}
              {error && <div className="text-xs text-red-600">{error}</div>}
              {/* </div> */}
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-indigo-700 hover:bg-indigo-600 rounded py-2 w-full transition duration-150 ease-in">
                <span className="mr-2 uppercase">Sign up</span>
                <span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center mt-6">
            <Link
              to="/login"
              className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
              <span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
              <span className="ml-2">You can sign in here</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
