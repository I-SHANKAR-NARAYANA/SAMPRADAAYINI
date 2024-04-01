import addScript from "./addScript";
import react, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      <title>allCourse</title>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
      />

      <header className="header">
        <section className="flex">
          <h1 className="logname">PILGRIM'S PATH</h1>
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

      <section className="courses">
        <h1 className="heading">our courses</h1>

        <div className="box-container">
          <div className="box">
            <div className="tutor">
              <img src={pic2} alt="" />
              <div className="info">
                <h3>TEACHER 1</h3>
              </div>
            </div>
            <div className="thumb">
              <img src={thumb1} alt="" />
              <span>10 videos</span>
            </div>
            <h3 className="title">HTML tutorial</h3>
          </div>

          <div className="box">
            <div className="tutor">
              <img src={pic3} alt="" />
              <div className="info">
                <h3>TEACHER 3</h3>
              </div>
            </div>
            <div className="thumb">
              <img src={thumb2} alt="" />
              <span>10 videos</span>
            </div>
            <h3 className="title">CSS tutorial</h3>
          </div>

          <div className="box">
            <div className="tutor">
              <img src={pic4} alt="" />
              <div className="info">
                <h3>TEACHER 2</h3>
              </div>
            </div>
            <div className="thumb">
              <img src={thumb3} alt="" />
              <span>10 videos</span>
            </div>
            <h3 className="title">JS tutorial</h3>
          </div>

          <div className="box">
            <div className="tutor">
              <img src={pic5} alt="" />
              <div className="info">
                <h3>TEACHER 4</h3>
              </div>
            </div>
            <div className="thumb">
              <img src={thumb4} alt="" />
              <span>10 videos</span>
            </div>
            <h3 className="title">Boostrap tutorial</h3>
          </div>

          <div className="box">
            <div className="tutor">
              <img src={pic6} alt="" />
              <div className="info">
                <h3>TEACHER 2</h3>
              </div>
            </div>
            <div className="thumb">
              <img src={thumb5} alt="" />
              <span>10 videos</span>
            </div>
            <h3 className="title">JQuery tutorial</h3>
          </div>

          <div className="box">
            <div className="tutor">
              <img src={pic7} alt="" />
              <div className="info">
                <h3>TEACHER 5</h3>
              </div>
            </div>
            <div className="thumb">
              <img src={thumb6} alt="" />
              <span>10 videos</span>
            </div>
            <h3 className="title">SASS tutorial</h3>
          </div>

          <div className="box">
            <div className="tutor">
              <img src={pic8} alt="" />
              <div className="info">
                <h3>TEACHER 1</h3>
              </div>
            </div>
            <div className="thumb">
              <img src={thumb7} alt="" />
              <span>10 videos</span>
            </div>
            <h3 className="title"> PHP tutorial</h3>
          </div>

          <div className="box">
            <div className="tutor">
              <img src={pic9} alt="" />
              <div className="info">
                <h3>TEACHER 7</h3>
              </div>
            </div>
            <div className="thumb">
              <img src={thumb8} alt="" />
              <span>10 videos</span>
            </div>
            <h3 className="title">MySQL tutorial</h3>
          </div>

          <div className="box">
            <div className="tutor">
              <img src={pic1} alt="" />
              <div className="info">
                <h3>TEACHER 7</h3>
              </div>
            </div>
            <div className="thumb">
              <img src={thumb9} alt="" />
              <span>10 videos</span>
            </div>
            <h3 className="title">REACT tutorial</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
export default App;
