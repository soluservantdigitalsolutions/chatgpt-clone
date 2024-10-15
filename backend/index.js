const express = require("express");
const app = express();
const port = process.env.PORT || 8081

const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  urlEndpoint: "<YOUR_IMAGEKIT_URL_ENDPOINT>",
  publicKey: "<YOUR_IMAGEKIT_PUBLIC_KEY>",
  privateKey: "<YOUR_IMAGEKIT_PRIVATE_KEY>",
});

// allow cross-origin requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/auth", function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})