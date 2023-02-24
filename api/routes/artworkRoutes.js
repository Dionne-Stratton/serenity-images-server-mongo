const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const imageModel = require("../models/Artwork");

const {
  validatePayload,
  validatePayloadTypes,
} = require('../middleware/addArtMiddleware')

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
        console.log("image is saved", req.file);
      })
      .catch((err) => {
        console.log(err, "error");
      });
      res.send('image is saved')
  });

router.get('/', async (req, res) => {

  try {
    const allData = await imageModel.find()
    res.json(allData)
  } catch (error) {
    res.status(500).send(error.message)
  }

})

router.get('/:id', async (req, res) => {
    
    try {
      const singleArtwork = await imageModel.find({ _id: req.params.id })
      res.send(singleArtwork)
  } catch (error) {
      res.status(500).send(error.message)
  }
})



module.exports = router