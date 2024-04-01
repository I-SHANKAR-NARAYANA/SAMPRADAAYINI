import { useNavigate } from "react-router-dom";
import logo from "./images/LOGO.jpg";
import React, { useEffect } from "react";
import "../css/style.css";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    // Add the class when the component mounts
    document.body.classList.add("no-padding-left");
    // console.log("no padding", document.body.classList);
    // Remove the class when the component unmounts (cleanup)
    return () => {
      document.body.classList.remove("no-padding-left");
      // console.log("yes padding", document.body.classList);
    };
  }, []);
  function click1() {
    navigate("/register");
  }
  function click2() {
    navigate("/login");
  }

  return (
    <div className="bg">
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>HomePage</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />
      <div className="intro">
        <h1>welcome to Pilgrimage's Path</h1>
        <div className="navbtns">
          <button onClick={click1}>Register</button>
          <button onClick={click2}>Login</button>
        </div>
      </div>
    </div>
  );
}
export default App;
