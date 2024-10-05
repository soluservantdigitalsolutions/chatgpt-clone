import React from "react";
import "./Dashboard.css";
import logo from "../../../Public/images/logo-neural-feed.png";
import chat from "../../../Public/images/chat.png";
import images from "../../../Public/images/images.png";
import code from "../../../Public/images/code.png";
import arrow from "../../../Public/images/arrow.png";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboardTexts">
        <div className="dashboardLogo">
          <img src={logo} alt="" className="dashboardLogoImage" />
          <h1>Neural Feed AI</h1>
        </div>
        <div className="dashboardOptions">
          <div className="dashboardOption">
            <img src={chat} alt="" className="dashboardOptionImage" />
            <span>Start a New Chat</span>
          </div>
          <div className="dashboardOption">
            <img src={images} alt="" className="dashboardOptionImage" />
            <span>Analyze Images</span>
          </div>
          <div className="dashboardOption">
            <img src={code} alt="" className="dashboardOptionImage" />
            <span>Help With Code</span>
          </div>
        </div>
      </div>
      <div className="dashboardFormContainer">
        <form className="dashboardForm">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="dashboardFormInput"
          />
          <button className="dashboardFormButton">
            <img src={arrow} alt="" className="dashboardFormImage" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
