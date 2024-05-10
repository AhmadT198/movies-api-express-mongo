const express = require("express")
const router = express.Router()
const {Movie} = require("../models/Movie")
const {validate} = require("../utils/movieUtils")
const { Genre } = require("../models/Genre")
//GET all movies
router.get("/", async (req,res) => {
    const movies = await Movie.find().sort("title")
    return res.status(200).send(movies)
})

//GET a single movie
router.get("/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    if(!movie) return res.status(404).send("Could not find a movie with the given ID...")

    res.status(200).send(movie)
})

//Add (POST) a new movie
router.post("/",async (req, res) => {
    //Validate the request body
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(400).send("Invalid Genre.")

    try {
        const movie = new Movie({
            title : req.body.title,
            genre: {
                _id: req.body.genreId,
                name : genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        })
        await movie.save()
        res.status(200).send(movie)
    } catch (err) {
        res.status(500).send(err)
    }
})

//Update (PUT) a movie
router.put("/:id", async (req, res) => {
    //Validate the request body
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(400).send("Invalid Genre.")

    try {
        const movie = Movie.findByIdAndUpdate(req.params.id, {
            title : req.body.title,
            genre: {
                _id: req.body.genreId,
                name : genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, {new : true})
        if(!movie) return res.status(404).send("Could not find a movie with the given ID...")
        res.status(200).send(movie)

    } catch (err) {
        res.status(500).send(err)
    }
})


//DELETE a movie
router.delete("/:id", async (req,res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id,{new:true})
        if(!movie) return res.status(404).send("Could not find a movie with the given ID...")
        res.status(200).send(movie)
    } catch (err) {
        res.status(500).send(err)
    }
})



module.exports = router