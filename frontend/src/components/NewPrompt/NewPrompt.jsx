import React, { useEffect, useRef } from "react";
import "./NewPrompt.css";
import attachment from "../../../Public/images/attachment.png";
import arrow from "../../../Public/images/arrow.png";
import Upload from "../Upload/Upload";

const NewPrompt = () => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <>
      <div ref={endRef} className="endChat"></div>
      <form className="newForm">
        <Upload />
        <input type="file" id="file" hidden multiple={false} />
        <input
          type="text"
          placeholder="Ask me anything..."
          className="newFormInput"
        />
        <button className="newFormButton">
          <img src={arrow} alt="" className="newFormButtonImage" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
