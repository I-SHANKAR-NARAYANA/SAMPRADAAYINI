import React from "react";
import ReactDOM from "react-dom/client";
import { useLocation } from "react-router-dom";
import "./index.css";
import App from "./App";

// if (window.location.href.includes("/home")) {
//   document.body.classList.add("bodyPadding");
// } else {
//   document.body.classList.remove("bodyPadding");
// }
const root = document.getElementById("root");
const rootElement = (
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
ReactDOM.createRoot(root).render(rootElement);
