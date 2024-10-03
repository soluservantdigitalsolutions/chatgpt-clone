import React from "react";
import "./ChatMenu.css";
import { Link } from "react-router-dom";
import logo from "../../../Public/images/logo-neural-feed.png";

const ChatMenu = () => {
  return (
    <div className="chatMenu">
      <span className="title">DASHBOARD</span>
      <Link className="Link" to={"/dashboard"}>
        Create a new Chat
      </Link>
      <Link className="Link" to={"/"}>
        Explore Neural Feed AI
      </Link>
      <Link className="Link" to={"/"}>
        Contact
      </Link>
      <hr className="chatMenuHr" />
      <span className="title">CHAT HISTORY</span>
      <div className="list">
        <Link className="Link" to={"/"}>
          Chat Title
        </Link>
        <Link className="Link" to={"/"}>
          Chat Title
        </Link>
        <Link className="Link" to={"/"}>
          Chat Title
        </Link>
        <Link className="Link" to={"/"}>
          Chat Title
        </Link>
        <Link className="Link" to={"/"}>
          Chat Title
        </Link>
        <Link className="Link" to={"/"}>
          Chat Title
        </Link>
        <Link className="Link" to={"/"}>
          Chat Title
        </Link>{" "}
        <Link className="Link" to={"/"}>
          Chat Title
        </Link>{" "}
        <Link className="Link" to={"/"}>
          Chat Title
        </Link>{" "}
        <Link className="Link" to={"/"}>
          Chat Title
        </Link>{" "}
        <Link className="Link" to={"/"}>
          Chat Title
        </Link>{" "}
        <Link className="Link" to={"/"}>
          Chat Title
        </Link>{" "}
        <Link className="Link" to={"/"}>
          Chat Title
        </Link>
      </div>
      <hr className="chatMenuHr" />
      <div className="upgrade">
        <img src={logo} alt="" className="chatMenuPro" />
        <div className="texts">
          <span>Upgrade to Feed AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMenu;
