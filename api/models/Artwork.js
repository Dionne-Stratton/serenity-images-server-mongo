const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  title: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  keyword: String,
  size: String,
  description: String,
  price: Number,
  buy: String,
  podLink: String
});

module.exports = ImageModel = mongoose.model("Artwork", imgSchema);
