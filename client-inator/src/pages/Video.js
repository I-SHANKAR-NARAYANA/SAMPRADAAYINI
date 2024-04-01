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
import vid1 from "./images/vid1.mp4";
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
  const allDet = sessionStorage.getItem("dett");
  const parsedDet = JSON.parse(allDet) || [];

  const arr = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9];
  const picp = arr[parsedDet.picn];

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

  function getRandomNumber() {
    const randomNumber = Math.random();
    const scaledNumber = Math.floor(randomNumber * 9);
    return scaledNumber;
  }

  let imgsrc;
  const num = sessionStorage.getItem("num") || 0;
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

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>video</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
      />
      <div className="header">
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

      <section className="watch-video">
        <div className="video-container">
          <div className="video">
            <video src={vid1} controls poster={imgsrc} id="video"></video>
          </div>
          <div className="info">
            <p className="date">
              <i className="fas fa-calendar"></i>
            </p>
            <p className="date">
              <i className="fas fa-heart"></i>
              <span>44 likes</span>
            </p>
          </div>
        </div>
      </section>

      <section className="comments">
        <h1 className="heading">5 comments</h1>

        <form onSubmit={hell} className="add-comment">
          <h3>add comments</h3>
          <textarea
            name="comment_box"
            placeholder="enter your comment"
            required
            maxLength="1000"
            cols="30"
            rows="10"
          ></textarea>
          <input
            type="submit"
            value="add comment"
            className="inline-btn"
            name="add_comment"
          />
        </form>

        <h1 className="heading">user comments</h1>

        <div className="box-container">
          <div className="box">
            <div className="user">
              <img src={arr[getRandomNumber()]} alt="" />
              <div>
                <h3>STUDENT 1</h3>
              </div>
            </div>
            <div className="comment-box">Good Explanation!</div>
          </div>

          <div className="box">
            <div className="user">
              <img src={arr[getRandomNumber()]} alt="" />
              <div>
                <h3>john deo</h3>
              </div>
            </div>
            <div className="comment-box">awesome tutorial! keep going!</div>
          </div>

          <div className="box">
            <div className="user">
              <img src={arr[getRandomNumber()]} alt="" />
              <div>
                <h3>STUDENT 2</h3>
              </div>
            </div>
            <div className="comment-box">
              amazing way of teaching! thank you so much!
            </div>
          </div>

          <div className="box">
            <div className="user">
              <img src={arr[getRandomNumber()]} alt="" />
              <div>
                <h3>STUDENT 3</h3>
              </div>
            </div>
            <div className="comment-box">
              loved it, thanks for the tutorial!
            </div>
          </div>

          <div className="box">
            <div className="user">
              <img src={arr[getRandomNumber()]} alt="" />
              <div>
                <h3>STUDENT 4</h3>
              </div>
            </div>
            <div className="comment-box">
              this is what I have been looking for! thank you so much!
            </div>
          </div>

          <div className="box">
            <div className="user">
              <img src={arr[getRandomNumber()]} alt="" />
              <div>
                <h3>STUDENT 5</h3>
              </div>
            </div>
            <div className="comment-box">
              thanks for the tutorial! how to download source code file?
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
