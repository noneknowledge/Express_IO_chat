
const clientRoute = require("./clientRoute")

function route(app){

    app.use("/client",clientRoute)
}

module.exports = route