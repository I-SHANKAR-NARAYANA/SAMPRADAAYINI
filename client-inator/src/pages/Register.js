import addScript from "./addScript";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/style.css";
import success from "./images/successv.png";
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
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [schoolid, setSchoolId] = useState("");

  useEffect(() => {
    addScript();
  }, []);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  function hello() {
    navigate("/home");
  }

  async function generateUserId() {
    const min = 10000;
    const max = 99999;
    const userId = Math.floor(Math.random() * (max - min + 1)) + min;

    return userId;
  }

  async function registerUser(event) {
    event.preventDefault();

    const userid = await generateUserId();
    const response = await fetch("http://localhost:1337/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        userid,
        schoolid,
        selectedRole,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      console.log("antha ok");
      const formContainer = document.getElementById("form-container");
      formContainer.style.display = "none";
      const replacementContent = document.getElementById("form2");
      replacementContent.style.display = "block";
    } else {
      console.log("edo chusko", data.status);
    }
  }

  async function sendOtp(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:1337/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    const data = await response.json();

    if (data.valid === true) {
      const imgc = document.getElementById("imgcontainer");
      imgc.style.display = "block";
      const replacementContent = document.getElementById("form2");
      replacementContent.style.display = "none";
    } else {
      alert("WRONG OTP");
    }
  }

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>register</title>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
      />
      <header className="header">
        <section className="flex">
          <h1 className="logname">WELCOME TO EDUPULSE</h1>
          <div className="icons">
            <div id="menu-btn" className="fas fa-bars"></div>
            <div id="user-btn" className="fas fa-user"></div>
            <div id="toggle-btn" className="fas fa-sun"></div>
          </div>

          <div className="profile">
            <img src={pic4} className="image" alt="" />
            <h3 className="name">VIEWER</h3>
            <div className="flex-btn">
              <a onClick={navlog} className="option-btn">
                LOGIN
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
        <div id="form-container">
          <form onSubmit={registerUser} encType="multipart/form-data">
            <h3>REGISTRATION</h3>
            <p>
              NAME<span>*</span>
            </p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              maxLength="50"
              className="box"
            />
            <p>
              E-MAIL<span>*</span>
            </p>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              required
              maxLength="20"
              className="box"
            />
            <p>
              SCHOOL ID<span>*</span>
            </p>
            <input
              type="number"
              name="schoolid"
              value={schoolid}
              onChange={(e) => setSchoolId(e.target.value)}
              placeholder="Enter the teacher_id/student_id provided by your school"
              required
              maxLength="20"
              className="box"
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
            />
            <p>
              SELECT YOUR ROLE<span>*</span>
            </p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  checked={selectedRole === "teacher"}
                  onChange={handleRoleChange}
                  className="box"
                />{" "}
                <pre> TEACHER </pre>
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={selectedRole === "student"}
                  onChange={handleRoleChange}
                  className="box"
                />{" "}
                <pre> STUDENT </pre>
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  checked={selectedRole === "teacher"}
                  onChange={handleRoleChange}
                  className="box"
                />{" "}
                <pre> ADMIN </pre>
              </label>
            </div>
            <button type="submit" name="submit" className="btn">
              REGISTER
            </button>
            <br></br>
            <p>ALREADY HAVE AN ACCOUNT?</p>
            <a onClick={navlog} className="option-btn">
              LOGIN
            </a>
          </form>
        </div>
        <form
          onSubmit={sendOtp}
          encType="multipart/form-data"
          id="form2"
          style={{ display: "none" }}
        >
          <h3>OTP VERIFICATION</h3>
          <p>
            OTP<span>*</span>
          </p>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="number"
            name="otp"
            placeholder="Enter OTP sent to your mail"
            required
            maxLength="50"
            className="box"
          />
          <button type="submit" name="verify" className="btn">
            VERIFY OTP
          </button>
        </form>
        <div id="imgcontainer" style={{ display: "none" }}>
          <img src={success} className="image" alt="" />
          <p className="verify">OTP VERIFIED</p>
          <button onClick={navlog} name="submit" className="btn">
            LOGIN TO CONTINUE
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
