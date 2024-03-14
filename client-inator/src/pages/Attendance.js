import { useNavigate } from "react-router-dom";
import addScript from "./addScript";
import React, { useState, useEffect } from "react";
import "../css/style.css";
import pic1 from "./images/pic-1.jpg";
import pic2 from "./images/pic-2.jpg";
import pic3 from "./images/pic-3.jpg";
import pic4 from "./images/pic-4.jpg";
import pic5 from "./images/pic-5.jpg";
import pic6 from "./images/pic-6.jpg";
import pic7 from "./images/pic-7.jpg";
import pic8 from "./images/pic-8.jpg";
import pic9 from "./images/pic-9.jpg";
import thumb1 from "./images/thumb-1.png";
import thumb2 from "./images/thumb-2.png";
import thumb3 from "./images/thumb-3.png";
import thumb4 from "./images/thumb-4.png";
import thumb5 from "./images/thumb-5.png";
import thumb6 from "./images/thumb-6.png";
import thumb7 from "./images/thumb-7.png";
import thumb8 from "./images/thumb-8.png";
import thumb9 from "./images/thumb-9.png";
import defaul from "./images/defaul.png";
import { useCustomNavigation } from "./functions";

function App() {
  const {
    hell,
    navhome,
    logout,
    navlog,
    navreg,
    navcour,
    navabout,
    navteach,
    navcon,
    navatt,
  } = useCustomNavigation();

  const allDet = sessionStorage.getItem("dett");
  const parsedDet = JSON.parse(allDet) || [];
  const userid = parsedDet.userid;

  const arr = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9];
  const picp = arr[parsedDet.picn];
  const navigate = useNavigate();

  const getLog = () => {
    if (parsedDet.name == "VIEWER") {
      return (
        <div className="flex-btn">
          <a onClick={navlog} className="option-btn">
            login
          </a>
          <a onClick={navreg} className="option-btn">
            register
          </a>
        </div>
      );
    } else {
      return (
        <div className="flex-btn">
          <a onClick={logout} className="option-btn">
            logout
          </a>
        </div>
      );
    }
  };

  useEffect(() => {
    addScript();
  }, []);

  const [allCourses, setAllCourses] = useState([]);

  function clicked() {
    navigate("/addCourse");
  }

  async function fetchCourses() {
    const url = "http://localhost:1337/api/courses/" + userid;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllCourses(data.courseList);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }

  const clickedv = (e) => {
    const courseidstr = e.target.id;
    const part = courseidstr.split(",");
    const courseid = part[0];
    const num = part[1];
    sessionStorage.setItem("playlistcourseid", courseid);
    sessionStorage.setItem("num", num);
    navigate("/updateatt");
  };

  const fetchCourseDetails = (courseDetails) => {
    let imgsrc = defaul;
    let num = 0;
    if (courseDetails.title.toLowerCase().includes("html")) {
      imgsrc = thumb1;
      num = 1;
    } else if (courseDetails.title.toLowerCase().includes("css")) {
      imgsrc = thumb2;
      num = 2;
    } else if (
      courseDetails.title.toLowerCase().includes("javascript") ||
      courseDetails.title.toLowerCase().includes("js")
    ) {
      imgsrc = thumb3;
      num = 3;
    } else if (courseDetails.title.toLowerCase().includes("boostrap")) {
      imgsrc = thumb4;
      num = 4;
    } else if (courseDetails.title.toLowerCase().includes("jquery")) {
      imgsrc = thumb5;
      num = 5;
    } else if (courseDetails.title.toLowerCase().includes("sass")) {
      imgsrc = thumb6;
      num = 6;
    } else if (courseDetails.title.toLowerCase().includes("php")) {
      imgsrc = thumb7;
      num = 7;
    } else if (courseDetails.title.toLowerCase().includes("mysql")) {
      imgsrc = thumb8;
      num = 8;
    } else if (courseDetails.title.toLowerCase().includes("react")) {
      imgsrc = thumb9;
      num = 9;
    }
    const courseid = courseDetails.courseid;

    return (
      <div className="box" key={courseDetails.title}>
        <div className="tutor">
          <img src={picp} alt="" />
          <div className="info">
            <h3>{courseDetails.teacher}</h3>
            <span>{courseDetails.description}</span>
          </div>
        </div>
        <div className="thumb">
          <img src={imgsrc} alt="" />
          <span>10 videos</span>
        </div>
        <h3 className="title">{courseDetails.title}</h3>
        <button
          onClick={clickedv}
          id={String(courseid) + "," + String(num)}
          className="inline-btn"
        >
          update attendance
        </button>
      </div>
    );
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>thome</title>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
      />
      <header className="header">
        <section className="flex">
          <button className="inline-btn" onClick={clicked}>
            ADD COURSES
          </button>
          <h1 className="logname">YOU ARE IN EDUPULSE</h1>
          <div className="icons">
            <div id="menu-btn" className="fas fa-bars"></div>
            <div id="user-btn" className="fas fa-user"></div>
            <div id="toggle-btn" className="fas fa-sun"></div>
          </div>
          <div className="profile">
            <img src={picp} className="image" alt="" />
            <h3 className="name">{parsedDet.name}</h3>
            {getLog()}
          </div>
        </section>
      </header>

      <div className="side-bar">
        <div id="close-btn">
          <i className="fas fa-times"></i>
        </div>

        <div className="profile">
          <img src={picp} className="image" alt="" />
          <h3 className="name">{parsedDet.name}</h3>
        </div>

        <nav className="navbar">
          <a onClick={hell}>
            <i className="fas fa-home"></i>
            <span>home</span>
          </a>
          <a onClick={navabout}>
            <i className="fas fa-question"></i>
            <span>about</span>
          </a>

          <a onClick={navcon}>
            <i className="fas fa-headset"></i>
            <span>contact us</span>
          </a>
        </nav>
      </div>

      <section className="courses">
        <h1 className="heading">Your courses</h1>

        <div className="box-container">
          {allCourses === undefined ? (
            <p>Loading...</p>
          ) : allCourses.length === 0 ? (
            <p>No courses at the moment...</p>
          ) : (
            allCourses.map(fetchCourseDetails)
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
