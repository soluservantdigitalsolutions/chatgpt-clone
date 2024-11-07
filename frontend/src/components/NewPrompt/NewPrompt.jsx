import React, { useEffect, useRef } from "react";
import "./NewPrompt.css";
import arrow from "../../../Public/images/arrow.png";
import Upload from "../Upload/Upload";
import { useState } from "react";
import { IKImage } from "imagekitio-react";
import { model } from "../../../libs/gemini";
import Markdown from "react-markdown";
const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [image, setImage] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer, image.dbData]);

  const runPrompt = async (text) => {
    setQuestion(text);

    const result = await chat.sendMessageStream(
      Object.entries(image.aiData).length ? [image.aiData, text] : [text]
    );
    let aiAnswer = "";

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      aiAnswer += chunkText;
      setAnswer(aiAnswer);
    }
    setImage({
      isLoading: false,
      error: "",
      dbData: {},
      aiData: {},
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.prompt.value;

    if (!text) return;
    runPrompt(text);
  };
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
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div ref={endRef} className="endChat"></div>
      <form className="newForm" onSubmit={handleSubmit}>
        <Upload setImage={setImage} />
        <input type="file" id="file" hidden multiple={false} />
        <input
          type="text"
          placeholder="Ask me anything..."
          className="newFormInput"
          name="prompt"
        />
        <button className="newFormButton">
          <img src={arrow} alt="" className="newFormButtonImage" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
