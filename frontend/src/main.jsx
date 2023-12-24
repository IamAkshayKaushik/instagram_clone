import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Protected from "./pages/Protected";
import Home from "./pages/Home";
import VideoCall from "./pages/VideoCall";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protected Component={Home} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Protected Component={Profile} />} />
          <Route path="/inbox" element={<Protected Component={Chat} />} />
          <Route path="/videocall" element={<VideoCall />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
