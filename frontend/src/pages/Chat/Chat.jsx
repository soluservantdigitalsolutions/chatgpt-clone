import React from "react";
import "./Chat.css";
import NewPrompt from "../../components/NewPrompt/NewPrompt";

const Chat = () => {

  return (
    <div className="chatMain">
      <div className="chatWrapper">
        <div className="chat">
          <div className="message">Test Answer from AI</div>
          <div className="message user">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
          </div>{" "}
          <div className="message">Test Answer from AI</div>
          <div className="message user">Test prompt from User</div>{" "}
          <div className="message">Test Answer from AI</div>
          <div className="message user">Test prompt from User</div>{" "}
          <div className="message">Test Answer from AI</div>
          <div className="message user">Test prompt from User</div>{" "}
          <div className="message">Test Answer from AI</div>
          <div className="message user">Test prompt from User</div>{" "}
          <div className="message">Test Answer from AI</div>
          <div className="message user">Test prompt from User</div>{" "}
          <div className="message">Test Answer from AI</div>
          <div className="message user">Test prompt from User</div>{" "}
          <div className="message">Test Answer from AI</div>
          <div className="message user">Test prompt from User</div>{" "}
          <div className="message">Test Answer from AI</div>
          <div className="message user">Test prompt from User</div>{" "}
          <div className="message">Test Answer from AI</div>
          <div className="message user">Test prompt from User</div>
          <NewPrompt />
         
        </div>
      </div>
    </div>
  );
};

export default Chat;
