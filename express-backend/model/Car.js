const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
     ref: "User"
    },
    carType: {
        type: String,
        required: true
    },
    carNumber: {
        type: String,
        required: true
    },
    carOwner: {
        type: String,
        required: true
    },
    license: {
        type: String,
        required: true
    }

})

const Car = mongoose.model("Car", carSchema)
module.exports= Car