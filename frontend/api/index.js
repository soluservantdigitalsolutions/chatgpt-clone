import axios from "axios";

const API = axios.create({
  baseURL: " http://localhost:8080/api/v1",
  withCredentials: true,
});

export const addChat = (text) =>
  API.post("/chats", {
    text,
  });

export const fetchUserChats = () => API.get("/chats/user");

export const fetchChat = (id) => API.get(`/chats/${id}`);

export const updateConversation = (id, question, answer, image) =>
  API.put(`/chats/${id}`, {
    question,
    answer,
    image,
  });
