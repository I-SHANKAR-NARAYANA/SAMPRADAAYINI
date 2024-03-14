import React from "react";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ element, allowedRoles }) => {
  let allString = sessionStorage.getItem("dett");
  let selectedRole = JSON.parse(allString) || "VIEWER";
  let flag = 10;
  if (selectedRole != "VIEWER") {
    flag = 100;
  }
  const userRole = selectedRole?.selectedRole;
  if (userRole && (allowedRoles === userRole || allowedRoles === "video")) {
    return element;
  } else if (
    selectedRole === "VIEWER" &&
    allowedRoles != "video" &&
    allowedRoles != "teacher" &&
    allowedRoles != "student"
  ) {
    return element;
  } else {
    if (flag === 100) {
      if (selectedRole.selectedRole === "teacher") {
        return <Navigate to="/thome" />;
      } else if (selectedRole.selectedRole === "student") {
        return <Navigate to="/shome" />;
      }
    }
    return <Navigate to="/login" />;
  }
};
export default PrivateRoute;
