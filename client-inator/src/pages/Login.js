import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import addScript from "./addScript";
import pic4 from "./images/pic-4.jpg";
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

  useEffect(() => {
    addScript();
  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function hello() {
    navigate("/home");
  }

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.user) {
      sessionStorage.setItem("dett", JSON.stringify(data.det));
      alert("Login Successful");
      if (data.det.selectedRole === "teacher") {
        navigate("/thome");
      } else if (data.det.selectedRole === "student") {
        navigate("/shome");
      }
    } else {
      alert("Check username and password");
    }
  }

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>login</title>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
      />
      <header className="header">
        <section className="flex">
          <h1 className="logname">welcome to Pilgrimage's Path</h1>
          <div className="icons">
            <div id="menu-btn" className="fas fa-bars"></div>
            <div id="user-btn" className="fas fa-user"></div>
            <div id="toggle-btn" className="fas fa-sun"></div>
          </div>

          <div className="profile">
            <img src={pic4} className="image" alt="" />
            <h3 className="name">VIEWER</h3>
            <div className="flex-btn">
              <a onClick={navreg} className="option-btn">
                REGISTER
              </a>
            </div>
          </div>
        </section>
      </header>

      <div className="side-bar">
        <div id="close-btn">
          <i className="fas fa-times"></i>
        </div>

        <div className="profile">
          <img src={pic4} className="image" alt="" />
          <h3 className="name">VIEWER</h3>
        </div>

        <nav className="navbar">
          <a onClick={hello}>
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
        <form onSubmit={loginUser} encType="multipart/form-data">
          <h3>LOGIN</h3>
          <p>
            E-MAIL<span>*</span>
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
            PASSWORD<span>*</span>
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
    </div>
  );
}

export default App;
