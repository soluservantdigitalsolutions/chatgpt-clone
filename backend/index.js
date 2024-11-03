const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
const cors = require("cors");

const ImageKit = require("imagekit");
const { dbConnect } = require("./dbConnect/db");

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// allow cross-origin requests
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/v1/upload", function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});
app.listen(port, () => {
  dbConnect();
  console.log(`Server is running on http://localhost:${port}`);
});
