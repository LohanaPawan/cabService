const express = require('express')
const carController = require('../controllers/carController');
const router = express.Router();

router.post("/addCar", carController.addCar)
router.post("/getCar", carController.getCar)

module.exports= router 