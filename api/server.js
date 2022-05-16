const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const artworkRouter = require("./routes/artworkRoutes");

const server = express();


server.use(express.json());
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use("/artwork", artworkRouter);

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

server.get('/', (req, res) => {
    res.send(`Welcome to my API!!`)
})

module.exports = server;