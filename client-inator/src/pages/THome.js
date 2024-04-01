import { useNavigate } from "react-router-dom";
import addScript from "./addScript";
import React, { useState, useEffect, useRef } from "react";
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

  const allDet = sessionStorage.getItem("dett");
  const parsedDet = JSON.parse(allDet) || [];
  const userid = parsedDet.userid;

  const [showTable, setShowTable] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [tableData, setTableData] = useState(null);
  const [error, setError] = useState("");
  const tableRef = useRef(null);

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

  useEffect(() => {
    if (showTable && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showTable]);

  function LocationFetcher() {
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
  }

  async function submitCoords(event) {
    event.preventDefault();
    const result = await fetchSites(latitude, longitude);
    console.log("result");
    console.log(result);
    setTableData(result);
    console.log("tableData");
    console.log(tableData);
    setShowTable(true);
  }

  async function putToStorage(event) {}

  async function fetchSites(latitude, longitude) {
    const url = "http://localhost:1337/api/sites/" + latitude + "," + longitude;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("data fetched:", data);
      return data;
    } catch (error) {
      console.error("Error fetching sites:", error);
      throw error;
    }
  }

  function Table({ data }) {
    return (
      <table className="highlight-table" ref={tableRef}>
        <thead>
          <tr>
            <th>Number</th>
            <th>Places</th>
            <th>Distance</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(data).map((key, rowIndex) => (
            <tr
              key={key}
              className="table-row"
              id={data[key]}
              onClick={(event) => {
                const elementId = event.currentTarget.id;
                sessionStorage.setItem("place", elementId);
                console.log("here elemdent id", event.target.id, elementId);
                navigate("/chat");
              }}
            >
              <td>{rowIndex + 1}</td>

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
        <h1 className="heading">Search Temples & Cultural Sites</h1>
        <section className="form-container">
          <form onSubmit={submitCoords} encType="multipart/form-data">
            <div className="flex-btn">
              <a onClick={LocationFetcher} className="option-btn">
                FETCH COORDINATES AUTOMATICALLY
              </a>
            </div>
            <br></br>
            <h3>SUBMIT YOUR LOCATION MANUALLY</h3>
            <br></br>
            <p>
              LATITUDE<span>*</span>
            </p>
            <input
              value={latitude}
              name="latitude"
              onChange={(e) => setLatitude(e.target.value)}
              type="number"
              placeholder="Enter Latitude"
              required
              maxLength="20"
              className="box"
            />
            <p>
              LONGITUDE<span>*</span>
            </p>
            <input
              name="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              type="number"
              placeholder="Enter Longitude"
              required
              maxLength="20"
              className="box"
            />

            <input type="submit" value="SUBMIT" name="submit" className="btn" />
          </form>
        </section>
      </section>
      {showTable && tableData && <Table data={tableData} />}
    </div>
  );
}

export default App;
