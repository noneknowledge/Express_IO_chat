
const express = require("express")
const app = express()
const route = require("./routes")
const path = require("path")
const {engine} = require("express-handlebars")
const socketHandler = require("./helper/socketHandle")
const port = 8080

//Socket setup 
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

//use static files
app.use(express.static(__dirname + "/public"))

//Template engine

app.engine('hbs', engine({extname:'.hbs', helpers: {
  section: function(name, options) { 
    if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this); 
      return null;
    }
}   }))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,"resource/views"))

// Get form data 

app.use(express.json());
app.use(express.urlencoded({
  extended:true
}));

//route
route(app)

//Socket io event
socketHandler(io)



//default route
app.get("/",(req,res)=> res.render("home",{variable:"hello"}))



// app.listen(port,console.log("Web listening on port: " + port))

server.listen(port, console.log("Server listen on port " + port))