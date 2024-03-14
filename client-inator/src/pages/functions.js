import { useNavigate } from "react-router-dom";

export const useCustomNavigation = () => {
  const navigate = useNavigate();

  const hell = (event) => {
    event.preventDefault();
  };

  const logout = () => {
    sessionStorage.removeItem("dett");
    navigate("/login");
  };

  const navhome = (rol) => {
    if (rol == "teacher") {
      navigate("/thome");
    } else if (rol == "student") {
      navigate("/shome");
    } else {
      navigate("/register");
    }
  };

  const navlog = () => {
    navigate("/login");
  };

  const navreg = () => {
    navigate("/register");
  };

  const navcour = () => {
    navigate("/allcourses");
  };

  const navabout = () => {
    navigate("/about");
  };

  const navteach = () => {
    navigate("/teachers");
  };

  const navcon = () => {
    navigate("/contact");
  };

  const navatt = () => {
    navigate("/attendance");
  };

  return {
    hell,
    logout,
    navhome,
    navlog,
    navreg,
    navcour,
    navabout,
    navteach,
    navcon,
    navatt,
  };
};
