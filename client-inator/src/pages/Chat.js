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

  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [checker, setChecker] = useState([false]);

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
    const place = sessionStorage.getItem("place");
    if (place) {
      setInputText(`give history of ${place}`);
      sessionStorage.removeItem("place");
      setChecker(true);
      sendMessage();
    }
  }, []);

  const sendMessage = async () => {
    console.log("sendMessage function called");
    console.log(
      inputText.trim(),
      "ff",
      inputText.trim() != "",
      "jfjf",
      checker
    );
    if (inputText.trim() !== "" && checker == true) {
      const userMessage = { sender: "user", text: inputText };
      setChecker(false);
      console.log("Trying", checker);
      // Send the user message to the server
      try {
        const response = await fetch("http://localhost:1337/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: inputText }),
        });
        if (!response.ok) {
          throw new Error("Failed to send message to server");
        }

        // Assuming the server responds with bot's response
        const botResponseText = await response.text();
        console.log(botResponseText);
        const botResponse = { sender: "bot", text: botResponseText };

        // Combine user message and bot response into one array
        const updatedMessages = [...messages, userMessage, botResponse];

        // Update state with the new array of messages
        setMessages(updatedMessages);

        // Clear input text after sending message
        setInputText("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  function Chat() {
    return (
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === "user" ? "right" : "left"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
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
      <div className="chat-container">
        <Chat />
        <div className="input-container">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
