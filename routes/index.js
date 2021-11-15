const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Movie = require("../models/Movie.model");
const MONGO_URI = process.env.MONGO_URI;

/* GET home page */
router.get("/", (req, res, next) => res.render("index"));

router.get("/movies", async (req, res) => {
  try {
    mongoose.connect(MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const movies = await Movie.find();
    res.render("movies/movies-list", { movies });
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
});

router.get("/movie/:id", async (req, res) => {
  try {
    mongoose.connect(MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const movieInfo = await Movie.findById(req.params.id);
    res.render("movies/movie-info", { movieInfo });
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
