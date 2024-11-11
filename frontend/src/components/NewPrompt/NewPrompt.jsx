import React, { useEffect, useRef } from "react";
import "./NewPrompt.css";
import arrow from "../../../Public/images/arrow.png";
import Upload from "../Upload/Upload";
import { useState } from "react";
import { IKImage } from "imagekitio-react";
import { model } from "../../../libs/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateConversation } from "../../../api";
const NewPrompt = ({ data }) => {
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
  const formRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, image.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await updateConversation(
        data._id,
        question.length ? question : undefined,
        answer,
        image.dbData?.filePath || undefined
      );
      return res?.data;
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImage({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const runPrompt = async (text, isInitial) => {
    if (!isInitial) {
      setQuestion(text);
    }
    try {
      const result = await chat.sendMessageStream(
        Object.entries(image.aiData).length ? [image.aiData, text] : [text]
      );
      let aiAnswer = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        aiAnswer += chunkText;
        setAnswer(aiAnswer);
      }
      mutation.mutate();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.prompt.value;

    if (!text) return;
    runPrompt(text, false);
  };

  const isInitialized = useRef(false);
  useEffect(() => {
    if (!isInitialized.current) {
      if (data?.history?.length === 1) {
        runPrompt(data?.history[0].parts[0].text, true);
      }
    }
    isInitialized.current = true;
  }, []);

  return (
    <>
      {image?.isLoading && <div>Loading...</div>}
      {image?.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={image?.dbData?.filePath}
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
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
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
