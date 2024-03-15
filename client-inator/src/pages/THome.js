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
import { useCustomNavigation } from "./functions";

const { spawn } = require("child_process");
const path = require("path");

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
    navchat,
  } = useCustomNavigation();

  const data = {
    0: ["col1", "col2", "col3"],
    1: ["col1", "col2", "col3"],
    2: ["col1", "col2", "col3"],
    3: ["col1", "col2", "col3"],
  };

  const workingDirectory = path.join(__dirname, "../client-inator/src/pages/");

  async function siteSearcher(latitude, longitude) {
    process.chdir(workingDirectory);
    const pythonScript = path.join(
      __dirname,
      "../client-inator/src/pages/siteSearcher.py"
    );
    const processp = spawn("python", [pythonScript, latitude, longitude]);

    let hell;

    processp.stdout.on("data", (data) => {
      test = data.toString();
    });

    processp.stderr.on("data", (data) => {
      console.log("err results: %j", data.toString("utf8"));
    });

    processp.on("error", (err) => {
      console.error("Failed to start subprocess.", err);
    });

    await new Promise((resolve, reject) => {
      processp.stdout.on("end", () => {
        hell = JSON.parse(test);
        console.log(hell);
        resolve();
      });
    });

    console.log(hell);
    return hell;
  }

  const allDet = sessionStorage.getItem("dett");
  const parsedDet = JSON.parse(allDet) || [];
  const userid = parsedDet.userid;

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

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

  async function LocationFetcher() {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        setError(`Error retrieving location: ${error.message}`);
      }
    );
    res = await siteSearcher(latitude, longitude);
    return (
      <div>
        {error ? (
          <p>{error}</p>
        ) : (
          <p>
            Latitude: {latitude}, Longitude: {longitude}
          </p>
        )}
        <p>{res}</p>
      </div>
    );
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
    navigate("/playlist");
  };

  function Table({ data }) {
    return (
      <table className="highlight-table">
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key) => (
            <tr key={key} className="table-row">
              {data[key].map((item, index) => (
                <td key={index}>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

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
          {/* <button className="inline-btn" onClick={clicked}>
            ADD COURSES
          </button> */}
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
          <a onClick={navchat}>
            <i className="fas fa-comment"></i>
            <span>Explore</span>
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
        <h1 className="heading">our courses</h1>
        <section className="form-container">
          <form onSubmit={loginUser} encType="multipart/form-data">
            <h3>MANUALLY SUBMIT LOCATION</h3>
            <p>
              LATITUDE<span>*</span>
            </p>
            <input
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
              maxLength="50"
              className="box"
            />
            <p>
              LONGITUDE<span>*</span>
            </p>
            <input
              name="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
              maxLength="20"
              className="box"
            />

            <input type="submit" value="LOGIN" name="submit" className="btn" />
            <br></br>
            <p>NO ACCOUNT?</p>
            <a onClick={navreg} className="option-btn">
              REGISTER
            </a>
          </form>
        </section>
        <div className="more-btn">
          <a onClick={LocationFetcher} className="inline-option-btn">
            view all courses
          </a>
        </div>
      </section>
      {LocationFetcher()}
      <Table data={data} />
    </div>
  );
}

export default App;
