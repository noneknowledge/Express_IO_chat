
class ClientController {

    index (req,res){
        res.render("client/index")
    }

    showChat(req,res){
        res.render("client/chat")
    }

}

module.exports = new ClientController