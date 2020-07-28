const express = require('express')
const User = require('../model/User')
const bcrypt = require('bcrypt')

exports.getUsers = async (req, res) => {

    const usersFromDb = await User.find({})
    const userDetails = usersFromDb.map(user => {
        const userWithoutPassword = {
         fullName: user.fullName,
         mobile: user.mobile,
         email: user.email
        }
        return userWithoutPassword;
    })
    return res.json(userDetails);
}


//Get a single user
exports.getUser = async (req, res) => {
    console.log('getUser')
    const userId = req.body.userId
    console.log('id : ' ,userId)
    const user= await User.findOne({_id: userId})
    console.log(user)
        if(user){
            console.log(user)
            return res.status(201).json(user);        
        }
       
        else
        return res.json(user)   
}

