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
import DatePicker from "react-date-picker";
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

  function navvid() {
    navigate("/video");
  }

  const [courseDet, setCourseDet] = useState({ a: "dssd" });
  const courseid = sessionStorage.getItem("playlistcourseid");

  const allDet = sessionStorage.getItem("dett");
  const parsedDet = JSON.parse(allDet) || [];

  const arr = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9];
  const picp = arr[parsedDet.picn];
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);

  async function handleImageUpload(e) {
    console.log(55);
  }

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

  async function updateAtt(event) {
    event.preventDefault();
    const courseid = sessionStorage.getItem("playlistcourseid");
    console.log(courseid);

    const response = await fetch("http://localhost:1337/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedDate,
        courseid: courseid,
      }),
    });

    const data = await response.json();
    console.log(data.message);
  }

  useEffect(() => {
    addScript();
  }, []);

  function getRandomNumber() {
    const randomNumber = Math.random();
    const scaledNumber = Math.floor(randomNumber * 9);
    return scaledNumber;
  }

  let imgsrc;
  const num = sessionStorage.getItem("num");
  if (num == 0) {
    imgsrc = defaul;
  } else if (num == 1) {
    imgsrc = thumb1;
  } else if (num == 2) {
    imgsrc = thumb2;
  } else if (num == 3) {
    imgsrc = thumb3;
  } else if (num == 4) {
    imgsrc = thumb4;
  } else if (num == 5) {
    imgsrc = thumb5;
  } else if (num == 6) {
    imgsrc = thumb6;
  } else if (num == 7) {
    imgsrc = thumb7;
  } else if (num == 8) {
    imgsrc = thumb8;
  } else {
    imgsrc = thumb9;
  }

  useEffect(() => {
    if (courseid != null) {
      async function fetchCourse() {
        const url = "http://localhost:1337/api/coursefind/" + courseid;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setCourseDet(data.courseDet);
          })
          .catch((error) => {
            console.error("Error fetching courses:", error);
          });
      }
      fetchCourse();
    }
  }, []);

  if (courseid === null) {
    return (
      <div>
        <p>ERROR OCCURED</p>
        <br />
        <p>CLICK ON BUTTON "VIEW ATTENDANCE" AND GET NAVIGATED</p>
      </div>
    );
  }
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
      ></link>
      <header className="header">
        <section className="flex">
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

      <section className="playlist-details">
        <h1 className="heading">COURSE DETAILS</h1>
        <div className="row">
          <div className="column">
            <div className="thumb">
              <div className="details">
                <h3>{courseDet.title}</h3>
              </div>
              <br></br>
              <img src={imgsrc} alt="" />
            </div>
          </div>
          <section className="form-container">
            <form onSubmit={updateAtt} encType="multipart/form-data">
              <h3>UPLOAD PHOTOS</h3>
              <p>
                DATE<span>*</span>
              </p>
              <br></br>
              <input
                value={selectedDate}
                name="selectedDate"
                type="date"
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "40px",
                  border: "1px solid #ccc",
                  boxSizing: "border-box",
                }}
              />
              <p>
                IMAGES<span>*</span>
              </p>
              <br></br>
              <input
                type="file"
                name="images"
                multiple
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "40px",
                  border: "1px solid #ccc",
                  boxSizing: "border-box",
                  marginBottom: "10px",
                  display: "inline-block",
                }}
                onChange={(e) => handleImageUpload(e.target.files)}
              />
              <input
                type="submit"
                value="UPLOAD"
                name="submit"
                className="btn"
              />
            </form>
          </section>
        </div>
      </section>
    </div>
  );
}
export default App;
