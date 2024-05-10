const mongoose = require("mongoose")
const {genreSchema} = require("./Genre")

const movieSchema = new mongoose.Schema({
    title : {
        type : String,
        minlength : 1,
        maxlength : 250,
        required : true,
        trim : true
    },
    genre : {
        type : genreSchema,
        required: true
    },
    numberInStock : {
        type : Number,
        min: [0,"Number in stock cannot be negative."],
        default: 0
    },
    dailyRentalRate: {
        type : Number,
        min: [0,"Daily rental rate cannot be negative."],
        default: 0
    },
})

const Movie = mongoose.model("Movie", movieSchema)

exports.Movie = Movie