const {Customer} = require("../models/Customer")
const {Movie} = require("../models/Movie")
const {validate} = require("../utils/rentalUtils")
const {Rental} = require("../models/Rental")
const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const Fawn = require('fawn')
Fawn.init("mongodb://localhost:27017/genres-db")


router.get("/",async (req, res) => {
    const rentals = await Rental.find().sort("-dateOut")
    res.status(200).send(rentals)
});

router.get("/:id", async (req, res) => {
    const rental = await Rental.findById(req.params.id)
    if(!rental) return res.status(404).send("Rental with the given ID could not be found.")
    
    return res.status(200).send(rental)
});

router.post("/", async (req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId)
    if(!customer) return res.status(404).send("Customer with the given ID could not be found.")

    const movie = await Movie.findById(req.body.movieId)
    if(!movie) return res.status(404).send("Movie with the given ID could not be found.")
    
    if(movie.numberInStock === 0) return res.status(400).send("Requested movie is unavailable in stock.")
    
    let rental = new Rental({
        customer:{
            _id : customer._id,
            name : customer.name,
            isGold : customer.isGold,
            phone : customer.phone
        },
        movie : {
            _id : movie._id,
            title : movie.title,
            dailyRentalRate : movie.dailyRentalRate
        }
    })

    try {
        // // These 2 save operations should be done in a transactions
        // rental = await rental.save()
        // movie.numberInStock--;
        // await movie.save()
        // We use Fawn which implements a 2-phase commit approach


        const session = await mongoose.startSession();
        await session.withTransaction(async (session) => {
            rental = await rental.save()
            movie.numberInStock--;
            await movie.save()
        })
        session.endSession()
            

        return res.status(200).send(rental)
    } catch(err) {
        return res.status(500).send("Sth went wrong.")
    }

});

module.exports = router