import "../css/style.css";
import { useNavigate } from "react-router-dom";
import addScript from "./addScript";
import React, { useState, useEffect } from "react";
import pic1 from "./images/pic-1.jpg";
import pic2 from "./images/pic-2.jpg";
import pic3 from "./images/pic-3.jpg";
import pic4 from "./images/pic-4.jpg";
import pic5 from "./images/pic-5.jpg";
import pic6 from "./images/pic-6.jpg";
import pic7 from "./images/pic-7.jpg";
import pic8 from "./images/pic-8.jpg";
import pic9 from "./images/pic-9.jpg";
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
  } = useCustomNavigation();

  const allDet = sessionStorage.getItem("dett");
  const parsedDet = JSON.parse(allDet) || [];
  const namer = parsedDet.name;
  const role = parsedDet.selectedRole;

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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [associatedResources, setAssociatedResources] = useState("");
  const [studentsList, setStudentsList] = useState("");
  const teacher = parsedDet.name;

  async function generateCourseId() {
    const min = 1000;
    const max = 9999;
    const userId = Math.floor(Math.random() * (max - min + 1)) + min;

    return userId;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const courseid = await generateCourseId();
    const response = await fetch("http://localhost:1337/api/add_course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        syllabus,
        associatedResources,
        studentsList,
        teacher,
        courseid,
      }),
    });

    const data = await response.json();
    alert(data.message);
    navigate("/thome");
  }
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>addcourse</title>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
      />
      <header className="header">
        <section className="flex">
          <h1 className="logname">YOU ARE IN PILGRIM'S PATH</h1>
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
          <a onClick={() => navhome(parsedDet.selectedRole)}>
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

      <section className="form-container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h3>COURSE DETAILS</h3>
          <p>
            TITLE<span>*</span>
          </p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            placeholder="Enter course title"
            required
            maxLength="50"
            className="box"
          />
          <p>
            DESCRIPTION<span>*</span>
          </p>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter course decription"
            required
            maxLength="50"
            className="box"
          ></textarea>
          <p>
            SYLLABUS<span>*</span>
          </p>
          <textarea
            name="syllabus"
            value={syllabus}
            onChange={(e) => setSyllabus(e.target.value)}
            placeholder="Enter course syllabus"
            required
            maxLength="50"
            className="box"
          ></textarea>
          <p>
            ASSOCIATED RESOURCES<span>*</span>
          </p>
          <input
            type="text"
            name="associatedResources"
            value={associatedResources}
            onChange={(e) => setAssociatedResources(e.target.value)}
            placeholder="Enter links for resources"
            maxLength="20"
            className="box"
          />
          <p>
            STUDENTS TO BE ENROLLED<span>*</span>
          </p>
          <input
            type="text"
            name="studentsList"
            value={studentsList}
            onChange={(e) => setStudentsList(e.target.value)}
            placeholder="Enter Student ids space seperated"
            maxLength="20"
            className="box"
          />
          <input
            type="submit"
            value="ADD COURSE"
            name="ADD COURSE"
            className="btn"
          />
        </form>
      </section>
    </div>
  );
}
export default App;
