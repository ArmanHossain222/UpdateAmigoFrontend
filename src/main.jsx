import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Footer from "./Layout/Footer.jsx";
import Navbar from "./Layout/Navbar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar></Navbar>
    <App />
    <Footer></Footer>
  </StrictMode>
);
