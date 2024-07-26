

socketHandler = (io) =>{
    const roomClient = []

    io.on('connection', (socket) => {
        console.log('a user connected')
        socket.on("chat message", (clientMes) =>{
        var date = new Date()
        var formatedDate = date.toLocaleString('en-US',{dateStyle:'long',timeStyle:"short"})
        var serverMessage = {clientId: socket.id, msg:clientMes.msg, room:clientMes.room,date: formatedDate}
        io.to(clientMes.room).emit("pass message", serverMessage)
        })

        socket.on("send image", (clientData)=>{
           
            const {files, room} = clientData
            var date = new Date()
            var formatedDate = date.toLocaleString('en-US',{dateStyle:'long',timeStyle:"short"})
            var serverMessage = {clientId: socket.id, files:files, room:room,date: formatedDate}
            io.to(room).emit("pass image", serverMessage)
        })

        socket.on("join room", (roomName)=>{
            socket.join(roomName)
            var room =roomClient.findIndex(room => room.roomName === roomName) 
            if(room !== -1){
                roomClient[room].count += 1
                io.emit("room event", {roomName,online:roomClient[room].count,clientId:socket.id})
            }
            else{
                var newRoom = {roomName,count:1}
                roomClient.push(newRoom)
                io.emit("room event", {roomName,online:1,clientId:socket.id})
                
            }        
           
        })
        socket.on("disconnecting",()=>{
            var mySet =socket.rooms.values()
            var changeRoom = []
            while (true){
                const {value,done} = mySet.next()
                var room =roomClient.findIndex(room => room.roomName === value) 
                if(room !== -1){
                    changeRoom.push(room)
                    roomClient[room].count -= 1
                }
                if(done) break
            }
            changeRoom.forEach(index =>{
                var room =roomClient[index]
                io.emit("room event", {roomName:room.roomName,online:room.count,clientId:socket.id})
            })
           
           
        })
        socket.on("disconnect",()=>{
            
          console.log("user disconnect ")

        })
      })
      
    
}




module.exports = socketHandler