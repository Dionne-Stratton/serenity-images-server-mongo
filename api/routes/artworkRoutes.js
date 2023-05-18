const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const imageModel = require("../models/Artwork");

//save to uploads folder before converting then
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("testImage"), (req, res) => {
  const saveImage = imageModel({
    title: req.body.title,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/jpeg",
    },
    keyword: req.body.keyword,
    size: req.body.size,
    description: req.body.description,
    price: req.body.price,
    imageURL: req.body.imageURL,
    buy: req.body.buy,
    podLink: req.body.podLink,
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved", req.file);
    })
    .catch((err) => {
      console.log(err, "here is the error");
    });
  res.send("image is saved");
});

router.get("/", async (req, res) => {
  try {
    const allData = await imageModel.find();
    res.json(allData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleArtwork = await imageModel.find({ _id: req.params.id });
    console.log("get by ID", req.params.id);
    res.send(singleArtwork);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await imageModel.deleteOne({ _id: req.params.id });
    console.log(req.params.id);
    res.send(`deleted`);
  } catch (error) {
    console.log(req.params.id);
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await imageModel.updateOne({ _id: req.params.id }, req.body);
    //sending back the newly updated array of artwork
    let artListing = await imageModel.find({ _id: req.params.id });
    res.send(artListing);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
