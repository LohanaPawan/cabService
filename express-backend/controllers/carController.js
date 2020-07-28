const Car = require('../model/Car')

const bcrypt = require('bcrypt')
const express = require('express')

// Add Car
exports.addCar = async (req, res) => {
    try{
    const {userId, carType, carOwner, carNumber, license} = req.body
    console.log(userId)
    const check = await Car.findOne({carNumber});
    if(check){
        return res.status(409).send(`Invalid entry`)
    }
    const car = new Car({
        userId,
        carType,
        carOwner,
        carNumber,
        license
    })
    const result = await car.save();
        res.status(201).json(result)
    }catch(error){
        console.log(error)
    }
}

exports.getCar = async (req, res) => {
try{
const {userId} = req.body
console.log(userId)
const check = await Car.findOne({_id: userId})
.populate('userId')
.exec((err, data) => {
    if(err)
    return res.json(err)

    console.log('success')
    return res.status(201).json({
        name : data.userId.name,
        mobile: data.userId.mobile,
        carType: data.carType,
        carNumber: data.carNumber
    })
})


}catch(error){
        console.log(error)
    }
}

