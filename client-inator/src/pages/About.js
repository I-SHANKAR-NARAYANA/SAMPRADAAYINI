import addScript from "./addScript";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/style.css";
import about from "./images/about-img.svg";
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
      <title>about us</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
      />
      <div className="header">
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
          <a onClick={hell}>
            <i className="fas fa-question"></i>
            <span>about</span>
          </a>

          <a onClick={navcon}>
            <i className="fas fa-headset"></i>
            <span>contact us</span>
          </a>
        </nav>
      </div>

      <section className="about">
        <div className="row">
          <div className="image">
            <img src={about} alt="" />
          </div>

          <div className="content">
            <h3>why choose us?</h3>
            <p>
              Our website is the ideal choice for all your needs because we are
              committed to delivering an exceptional experience. We understand
              that your time is precious, and that's why we've designed our
              platform to be user-friendly and efficient. Whether you're looking
              for information, products, services, or entertainment, our website
              offers a wide range of options to cater to your specific interests
              and requirements. Trust us to be your reliable online destination,
              and we promise to exceed your expectations every time you visit
              our website.
            </p>
            <a onClick={navcon} className="inline-btn">
              Contact us
            </a>
          </div>
        </div>
      </section>

      <section className="reviews">
        <h1 className="heading">user's reviews</h1>

        <div className="box-container">
          <div className="box">
            <p>
              I stumbled upon this website while searching for cultural sites,
              and I'm thrilled with what I found. The navigation is super
              smooth, and I easily signed up as a user. The content is
              top-notch, and the responsive design makes it just as enjoyable on
              my phone.
            </p>
            <div className="student">
              <img src={pic1} alt="" />
              <div>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <p>
              I recently discovered this website, and it's been a game-changer.
              The interface is clean, and I appreciate how responsive it is on
              my mobile. The wealth of content available here keeps me engaged
              for hours. Kudos to the team for such a fast-loading and
              user-centric platform!
            </p>
            <div className="student">
              <img src={pic2} alt="" />
              <div>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <p>
              As a teacher, I was looking for a platform to share my knowledge,
              and I found this website. It's a breeze to use, and I had my
              course uploaded within minutes. I'm impressed by the user-friendly
              interface and the responsive design. Teaching here is a joy!
            </p>
            <div className="student">
              <img src={pic4} alt="" />
              <div>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <p>
              I've been exploring various websites for cultural resources, but
              this one stands out. The fast loading speed ensures I can quickly
              access the content I need. The range of topics covered is
              impressive, and I appreciate the customer support. It was a
              smoothful experience.
            </p>
            <div className="student">
              <img src={pic6} alt="" />
              <div>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <p>
              This website has made my travel journey so much easier. The
              seamless navigation and rich content make studying a pleasure. I
              especially like that I can switch between my laptop and phone
              without any hiccups. The quick response from the support team is
              reassuring.
            </p>
            <div className="student">
              <img src={pic9} alt="" />
              <div>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <p>
              I've been using this website for a while now, and I love the
              personalized experience. It feels like the site understands what
              I'm looking for. The customization options are fantastic. Plus,
              the ability to access everything on my tablet makes my learning
              experience more flexible.
            </p>
            <div className="student">
              <img src={pic7} alt="" />
              <div>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default App;
