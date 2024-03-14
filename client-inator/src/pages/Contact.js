import addScript from "./addScript";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/style.css";
import contact from "./images/contact-img.svg";
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
      <title>contact us</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
      />
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

          <a onClick={hell}>
            <i className="fas fa-headset"></i>
            <span>contact us</span>
          </a>
        </nav>
      </div>

      <section className="contact">
        <div className="row">
          <div className="image">
            <img src={contact} alt="" />
          </div>

          <form onSubmit={hell}>
            <h3>get in touch</h3>
            <input
              type="text"
              placeholder="enter your name"
              name="name"
              required
              maxLength="50"
              className="box"
            />
            <input
              type="email"
              placeholder="enter your email"
              name="email"
              required
              maxLength="50"
              className="box"
            />
            <input
              type="number"
              placeholder="enter your number"
              name="number"
              required
              maxLength="50"
              className="box"
            />
            <textarea
              name="msg"
              className="box"
              placeholder="enter your message"
              required
              maxLength="1000"
              cols="30"
              rows="10"
            ></textarea>
            <input
              type="submit"
              value="send message"
              className="inline-btn"
              name="submit"
            />
          </form>
        </div>

        <div className="box-container">
          <div className="box">
            <i className="fas fa-phone"></i>
            <h3>PHONE NUMBER</h3>
            <a href="tel:1234567890">123-456-7890</a>
            <a href="tel:1112223333">111-222-3333</a>
          </div>

          <div className="box">
            <i className="fas fa-envelope"></i>
            <h3>E-MAIL ADDRESS</h3>
            <a>something@gmail.com</a>
            <a>something2@gmail.com</a>
          </div>

          <div className="box">
            <i className="fas fa-map-marker-alt"></i>
            <h3>OFFICE ADDRESS</h3>
            <a>Desiya Ninaivagam, Pei Karumbu, Rameswaram</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
