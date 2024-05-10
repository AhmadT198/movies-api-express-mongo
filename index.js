const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi); //Here require("joi-objectid") is a function, we then pass (Joi) as an argument to this function
const process = require("process");
const express = require("express");
const config = require('config')
if(!config.get("jwtPrivateKey")) {
    console.error("FATAL ERROR : jwtPrivateKey is not defined.");
    process.exit(1)
}

const genresAPI = require("./routes/genres");
const customersAPI = require("./routes/customers")
const moviesAPI = require("./routes/movies")
const rentalsAPI = require("./routes/rentals")
const usersAPI = require("./routes/users")
const authAPI = require('./routes/auth')

const mongoose = require("mongoose")
const app = express();
app.use(express.json()); // middleware to parse json objects in the body of the request

mongoose
    .connect("mongodb://localhost:27017/genres-db")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.err("Couldnt connect to MongoDB", err))


app.use("/api/genres", genresAPI);
app.use("/api/customers", customersAPI);
app.use("/api/movies", moviesAPI);
app.use("/api/rentals", rentalsAPI);
app.use("/api/users", usersAPI);
app.use("/api/auth", authAPI)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
