
const express = require('express')

const UserController = require('../controllers/users')
const router = express.Router();


router.get("/", UserController.getUsers)
router.post("/getUser", UserController.getUser)



module.exports = router;