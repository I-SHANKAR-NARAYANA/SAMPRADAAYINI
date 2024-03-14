import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Addcourse from "./pages/Addcourse";
import THome from "./pages/THome";
import SHome from "./pages/SHome";
import Allcourses from "./pages/Allcourses";
import Playlist from "./pages/Playlist";
import Video from "./pages/Video";
import About from "./pages/About";
import Teachers from "./pages/Teachers";
import Contact from "./pages/Contact";
import Allhome from "./pages/allhome";
import Attendance from "./pages/Attendance";
import UpdateAtt from "./pages/UpdateAtt";
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
            path="/shome"
            element={
              <PrivateRoute element={<SHome />} allowedRoles={"student"} />
            }
          />
          <Route
            path="/video"
            element={
              <PrivateRoute element={<Video />} allowedRoles={"video"} />
            }
          />
          <Route
            path="/playlist"
            element={
              <PrivateRoute element={<Playlist />} allowedRoles={"video"} />
            }
          />
          <Route
            path="/attendance"
            element={
              <PrivateRoute element={<Attendance />} allowedRoles={"video"} />
            }
          />
          <Route
            path="/updateatt"
            element={
              <PrivateRoute element={<UpdateAtt />} allowedRoles={"video"} />
            }
          />
          <Route path="/allcourses" element={<Allcourses />} />
          <Route path="/about" element={<About />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
