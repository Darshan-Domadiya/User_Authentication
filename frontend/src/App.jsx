import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./views/HomePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UpdateUser from "./views/UpdateUser";
import CreateUser from "./views/CreateUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./views/Login";
import Signup from "./views/Signup";

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update/:userId" element={<UpdateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
