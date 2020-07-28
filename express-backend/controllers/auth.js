const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')


//Login Logic

exports.loginUser = async (req, res) => {
    console.log("1")
    try {
        console.log("2")
            const {mobile, password} = req.body
            console.log(req.body)
            const user = await User.findOne({ mobile })
            console.log(user)
            if(user){
                const isPassword = await bcrypt.compare(password, user.password)
                console.log(isPassword)
                if(isPassword){ 
                    console.log(user) 
                   return res.status(201).json({user})
                }
               return res.status(500).json(`Wrong Password, Try again`)
            }
            return res.json(`This User does not exist`)

    }catch(error){
       res.status(500).send(error);
    }
}

// SignUp Logic
exports.createUser = async (req, res) => {
    try {
        console.log('reached')
        const {name, mobile, email, password} = req.body
         const check = await User.findOne({mobile});
        if(check){
            return res.status(409).send(`An account with this number, already exists!`)
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            name,
            mobile,
            email,
            password: hashedPassword
        })
        const result = await user.save();
        console.log(result)
        res.status(201).json(result)
    }catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
    
}