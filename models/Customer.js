const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name : {
        type: String,
        minlength: 3,
        maxlength: 50,
        required:true
    },
    phone : {
        type: String,
        minlength: 8,
        maxlength: 50,
        required:true
    },
    isGold : {
        type: Boolean,
        default:false
    },
})

const Customer = mongoose.model("Customer", customerSchema)

exports.Customer = Customer