import React, { useEffect, useRef } from "react";
import "./NewPrompt.css";
import arrow from "../../../Public/images/arrow.png";
import Upload from "../Upload/Upload";
import { useState } from "react";
import { IKImage } from "imagekitio-react";

const NewPrompt = () => {
  const [image, setImage] = useState({
    isLoading: false,
    error: "",
    dbData: {},
  });
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <>
      {image.isLoading && <div>Loading...</div>}
      {image.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={image.dbData?.filePath}
          className="attachmentImage"
        />
      )}
      <div ref={endRef} className="endChat"></div>
      <form className="newForm">
        <Upload setImage={setImage} />
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
