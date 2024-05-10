const express = require("express")
const router = express.Router();
const {Customer} = require("../models/Customer")
const {validateCustomer} = require("../utils/customerUtils")

//GET all customers
router.get("", async (req,res) => {
    const customers = await Customer.find().sort("name")
    res.status(200).send(customers)
})

//GET a single customer
router.get("/:id", async (req,res) => {
    const customer = await Customer.findById(req.params.id)
    if(!customer) return res.status(404).send("Customer with given ID cannot be found.")

    res.status(200).send(customer)
})

//POST a new customer
router.post("", async (req,res) => {
    //Validate input data
    const { error } = validateCustomer(req.body)
    if (error) return res.status(400).send(error.details[0].message)
  
    try {
        const customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        })
        await customer.save()
        res.status(200).send(customer)
    } catch (err) {
        res.status(500).send(err)
    }
})

//Update an existing customer
router.put("/:id", async (req,res) => {
    //Make sure the user exists
    const customer = await Customer.findById(req.params.id)
    if(!customer) return res.status(404).send("Customer with given ID cannot be found.")

    const { error } = validateCustomer(req.body)
    if(error) return res.status(400).send(error.details[0].message)


    try {
        customer.set(req.body)
        const updatedRecord = await customer.save()
        res.status(200).send(updatedRecord)
    } catch (err) {
        res.status(500).send(err)
    }
})

// DELETE a customer
router.delete("/:id", async (req,res) => {
    const customer = await Customer.findById(req.params.id)
    if(!customer) return res.status(404).send("Customer with given ID cannot be found.")

    try {
        await customer.deleteOne()
        res.status(200).send(customer)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router