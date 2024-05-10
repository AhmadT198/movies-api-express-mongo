const _ = require('lodash')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const {validate} = require("../utils/userUtils")
const {User} = require("../models/User")
const authorize = require("../middleware/auth")

router.get("/me", authorize, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    console.log(req.user._id)
    res.send(user)
})

router.post("/", async (req,res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email : req.body.email})
    if(user) return res.status(400).send('User already registered.')
    user = new User(_.pick(req.body,['name','email','password']))

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();
    
    res.header('x-auth-token', user.generateAuthToken()).send(_.pick(user,['_id','name','email']))
    
})


module.exports = router