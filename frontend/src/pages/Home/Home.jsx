import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1 className="logoText">NEURAL FEED AI</h1>
      <h2 className="homeText">
        Get answers. Find inspiration. Be more productive.
      </h2>
      <h3 className="subHomeText">
        Free to use. Easy to try. Just ask and ChatGPT can help with writing,
        learning, brainstorming, and more.
      </h3>
      <Link className="dashboardButton" to={"/dashboard"}>
        Get Started
      </Link>
    </div>
  );
};

export default Home;
