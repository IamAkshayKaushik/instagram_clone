import { useState } from "react";
import { useUserContext } from "../context/index";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, state, setState, setUser, login, logout } = useUserContext();

  const handleClick = (e) => {
    // e.preventDefault();
    // setUser({ username, password });
    e.preventDefault();
    const { email, password } = state;
    login(email, password);
    setState({
      email: "",
      password: "",
    });
  };
  return (
    <div className="mt-8 flex flex-col justify-center items-center">
      <div className="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
        <h1 className="bg-no-repeat instagram-logo"></h1>
        <form className="mt-8 w-64 flex flex-col">
          <input
            autoFocus
            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
            id="email"
            placeholder="Phone number, username, or email"
            type="text"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
          <input
            autoFocus
            className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
            id="password"
            placeholder="Password"
            type="password"
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
          <button
            className=" text-sm text-center bg-blue-300 text-white py-1 rounded font-medium"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleClick(e);
              console.log(state);
            }}>
            Log In
          </button>
        </form>
        <div className="flex justify-evenly space-x-2 w-64 mt-4">
          <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
          <span className="flex-none uppercase text-xs text-gray-400 font-semibold">or</span>
          <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
        </div>
        <button className="mt-4 flex">
          <div className="bg-no-repeat facebook-logo mr-1"></div>
          <span className="text-xs text-blue-900 font-semibold">Log in with Facebook</span>
        </button>
        <a className="text-xs text-blue-900 mt-4 cursor-pointer -mb-4">Forgot password?</a>
      </div>
      <div className="bg-white border border-gray-300 text-center w-80 py-4">
        <span className="text-sm">Don't have an account?</span>
        <a className="text-blue-500 text-sm font-semibold">Sign up</a>
      </div>
      <div className="mt-3 text-center">
        <span className="text-xs">Get the app</span>
        <div className="flex mt-3 space-x-2">
          <div className="bg-no-repeat apple-store-logo"></div>
          <div className="bg-no-repeat google-store-logo"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
