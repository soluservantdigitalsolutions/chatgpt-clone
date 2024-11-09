import React from "react";
import "./Chat.css";
import NewPrompt from "../../components/NewPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { fetchChat } from "../../../api";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";

const Chat = () => {
  const { id } = useParams();
  const { isPending, data, error } = useQuery({
    queryKey: ["chat", id],
    queryFn: () => fetchChat(id),
  });

  console.log(data?.data);
  return (
    <div className="chatMain">
      <div className="chatWrapper">
        <div className="chat">
          <div className="message">Test Answer from AI</div>
          {isPending
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.data.history.map((message, i) => (
                <>
                  {message.image && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.image}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                      className="attachmentImage"
                    />
                  )}
                  <div
                    className={
                      message.role === "user" ? "message user" : "message"
                    }
                    key={i}
                  >
                    <Markdown>{message.parts[0].text}</Markdown>
                  </div>
                </>
              ))}

          <NewPrompt />
        </div>
      </div>
    </div>
  );
};

export default Chat;
