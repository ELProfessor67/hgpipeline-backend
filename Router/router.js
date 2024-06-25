require("dotenv").config();
require("../Database/database");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
const auth = require("./auth");
const Channel = require("./channel");
const Videos = require("./videos");
const Likes = require("./likes");
const Comments = require("./comments");
const Studio = require("./studio");
const searchHistory = require('./searchHistory');
const ads = require("./ads");

// Middlewares
router.use(
  cors({
    origin: "*",
    methods: ["POST", "GET","PUT","DELETE"],
    credentials: true,
  })
);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(auth);
router.use(Channel);
router.use(Videos);
router.use(Likes);
router.use(Comments);
router.use(Studio);
router.use(searchHistory);
router.use(ads);

router.get("/", (req, res) => {
  res.send("Welcome to Youtube App Backend!");
});

module.exports = router;
