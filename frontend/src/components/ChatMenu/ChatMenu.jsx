import React from "react";
import "./ChatMenu.css";
import { Link } from "react-router-dom";
import logo from "../../../Public/images/logo-neural-feed.png";
import { useQuery } from "@tanstack/react-query";
import { fetchUserChats } from "../../../api";

const ChatMenu = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["userChats"],
    queryFn: fetchUserChats,
  });
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
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong!"
          : data?.data.map((chat) => (
              <Link
                className="Link"
                to={`/dashboard/chats/${chat._id}`}
                key={chat._id}
              >
                {chat.title}
              </Link>
            ))}
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
