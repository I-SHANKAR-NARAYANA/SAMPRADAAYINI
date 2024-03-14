import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Addcourse from "./pages/Addcourse";
import THome from "./pages/THome";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Allhome from "./pages/allhome";
import Chat from "./pages/Chat";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <div id="root">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Allhome />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route
            path="/register"
            element={<PrivateRoute element={<Register />} allowedRoles={""} />}
          />
          <Route
            path="/login"
            element={<PrivateRoute element={<Login />} allowedRoles={""} />}
          />
          <Route
            path="/thome"
            element={
              <PrivateRoute element={<THome />} allowedRoles={"teacher"} />
            }
          />
          <Route
            path="/addCourse"
            element={
              <PrivateRoute element={<Addcourse />} allowedRoles={"teacher"} />
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute element={<Chat />} allowedRoles={"teacher"} />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
