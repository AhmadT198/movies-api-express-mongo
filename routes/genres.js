const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const {Genre} = require("../models/Genre")
const {validateGenre} = require("../utils/genreUtils");
const admin = require("../middleware/admin")

// GET all genres
router.get("", async (req, res) => {
  const genres = await Genre.find().sort("name")
  res.send(genres);
});

// GET a single genre
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("The genre with the given ID was not found.");
  res.status(200).send(genre);
});

// POST a new genre
router.post("",auth, async (req, res) => {
  //Validate
  //If invalid, return 400 - Bad Request
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const genre = new Genre({ name : req.body.name})
    await genre.save()
    res.status(200).send(genre);
  } catch (err) {
    res.send(err)
  }
});

//Update a Specific Genre
router.put("/:id", async (req, res) => {
  //Validate
  //If invalid, return 400 - Bad Request
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Update
  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if (!genre) return res.status(404).send("The genre with the given ID was not found.");
    res.status(200).send(genre)
  } catch (err) {
    res.send(err)
  }
});

//Delete a Specific Genre
router.delete("/:id", [auth,admin], async (req, res) => {
  //Find the genre to be deleted
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id, {new:true})
    if (!genre) return res.status(404).send("The genre with the given ID was not found.");

    res.status(200).send(genre)
  } catch (err) {
    res.send(err)
  }
});

module.exports = router;
