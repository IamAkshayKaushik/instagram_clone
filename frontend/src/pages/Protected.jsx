import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserService from "../services/userService";
import { login, logout } from "../store/userSlice";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";

function Loading() {
  return (
    <div className="flex space-x-2 justify-center items-center bg-black h-screen dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-white rounded-full animate-bounce"></div>
    </div>
  );
}

function Protected(props) {
  const { Component } = props;

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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Component />
    </>
  );
}
Protected.propTypes = {
  Component: PropTypes.node,
};

export default Protected;
