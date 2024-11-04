const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
const cors = require("cors");

const ImageKit = require("imagekit");
const { dbConnect } = require("./dbConnect/db");
const chatRoutes = require("./routes/chat.routes");

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

app.use(express.json());
// allow cross-origin requests
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.get("/api/v1/upload", function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.use("/api/v1/chats", chatRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});

app.listen(port, () => {
  dbConnect();
  console.log(`Server is running on http://localhost:${port}`);
});
