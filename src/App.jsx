// import logo from "./logo.svg";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/userSlice";
import UserService from "./services/userService";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    UserService.getUser()
      .then((user) => {
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const state = useSelector((state) => state.user);
  console.log("state in App.jsx", state);

  return !state.isAuthenticated ? (
    <Login />
  ) : (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default App;
