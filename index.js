require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const port = 5000;
const fs = require("fs");
const imageModel = require("./model");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("mongo connected successfully"))
  .catch((err) => console.log("it has an error", err));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/", upload.single("testImage"), (req, res) => {
  const saveImage =  imageModel({
    title: req.body.title,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
    keyword: req.body.keyword,
    size: req.body.size,
    description: req.body.description,
    price: req.body.price,
    buy: req.body.buy,
    podLink: req.body.podLink
    
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
    res.send('image is saved')
});


app.get('/',async (req,res)=>{
  const allData = await imageModel.find()
  res.json(allData)
})

app.listen(port, () => {
  console.log(`server running successfully on port ${port}`);
});
