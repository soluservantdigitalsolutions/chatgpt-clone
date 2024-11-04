import axios from "axios";

const API = axios.create({
  baseURL: " http://localhost:8080/api/v1",
  withCredentials: true,
});

export const addChat = (text) =>
  API.post("/chats", {
    text,
  });
