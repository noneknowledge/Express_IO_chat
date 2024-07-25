//import
const express = require("express")
const router = express.Router()
const ClientController = require("../app/controllers/clientController")

router.get("/",ClientController.index)
router.get("/personal",ClientController.showChat)


module.exports = router