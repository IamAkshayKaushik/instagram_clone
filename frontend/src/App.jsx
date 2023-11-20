// import logo from "./logo.svg";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/userSlice";
import UserService from "./services/userService";
import { useNavigate } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    UserService.getUser()
      .then((user) => {
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout());
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, navigate]);

  // const state = useSelector((state) => state.user);
  // console.log("state in App.jsx", state);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default App;
