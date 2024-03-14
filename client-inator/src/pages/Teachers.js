import addScript from "./addScript";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  } = useCustomNavigation();

  const allDet = sessionStorage.getItem("dett");
  const parsedDet = JSON.parse(allDet) || {
    name: "VIEWER",
    selectedRole: "",
    picn: 3,
  };
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

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>teachers</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
      ></link>
      <div className="header">
        <section className="flex">
          <h1 className="logname">EDUPULSE</h1>
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
      </div>

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

      <section className="teachers">
        <h1 className="heading">expert teachers</h1>

        <div className="box-container">
          <div className="box">
            <div className="tutor">
              <img src={pic4} alt="" />
              <div>
                <h3>TEACHER 1</h3>
                <span>developer</span>
              </div>
            </div>
            <p>
              total playlists : <span>4</span>
            </p>
            <p>
              total videos : <span>18</span>
            </p>
            <p>
              total likes : <span>1208</span>
            </p>
          </div>

          <div className="box">
            <div className="tutor">
              <img src={pic1} alt="" />
              <div>
                <h3>TEACHER 5</h3>
                <span>developer</span>
              </div>
            </div>
            <p>
              total playlists : <span>5</span>
            </p>
            <p>
              total videos : <span>8</span>
            </p>
            <p>
              total likes : <span>1008</span>
            </p>
          </div>

          <div className="box">
            <div className="tutor">
              <img src={pic8} alt="" />
              <div>
                <h3>TEACHER 6</h3>
                <span>developer</span>
              </div>
            </div>
            <p>
              total playlists : <span>6</span>
            </p>
            <p>
              total videos : <span>15</span>
            </p>
            <p>
              total likes : <span>1578</span>
            </p>
          </div>

          <div className="box">
            <div className="tutor">
              <img src={pic2} alt="" />
              <div>
                <h3>TEACHER 2</h3>
                <span>developer</span>
              </div>
            </div>
            <p>
              total playlists : <span>3</span>
            </p>
            <p>
              total videos : <span>12</span>
            </p>
            <p>
              total likes : <span>1408</span>
            </p>
          </div>

          <div className="box">
            <div className="tutor">
              <img src={pic7} alt="" />
              <div>
                <h3>TEACHER 4</h3>
                <span>developer</span>
              </div>
            </div>
            <p>
              total playlists : <span>4</span>
            </p>
            <p>
              total videos : <span>10</span>
            </p>
            <p>
              total likes : <span>1558</span>
            </p>
          </div>

          <div className="box">
            <div className="tutor">
              <img src={pic6} alt="" />
              <div>
                <h3>TEACHER 3</h3>
                <span>developer</span>
              </div>
            </div>
            <p>
              total playlists : <span>2</span>
            </p>
            <p>
              total videos : <span>7</span>
            </p>
            <p>
              total likes : <span>1014</span>
            </p>
          </div>

          <div className="box">
            <div className="tutor">
              <img src={pic9} alt="" />
              <div>
                <h3>TEACHER 7</h3>
                <span>developer</span>
              </div>
            </div>
            <p>
              total playlists : <span>4</span>
            </p>
            <p>
              total videos : <span>18</span>
            </p>
            <p>
              total likes : <span>1208</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
