//import
const express = require("express")
const router = express.Router()
const ClientController = require("../app/controllers/clientController")

router.get("/",ClientController.index)


module.exports = router