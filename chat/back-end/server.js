const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io')

app.use(cors());

const server = http.createServer(app);

const io = new  Server (server, {
    cors:{
        origin:"http://localhost:3002",
        methods:["GET","POST"]
    }
})

io.on("connection", (socket)=>{
    console.log(`user is connect in${socket.id}`);
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`user with id ${socket.id} has joined room ${data}`);
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("received_message",data)
        console.log(data);
    })
    socket.on("disconnect", () =>{
        console.log("User disconnect", socket.id);
    })
}
)

server.listen(3001, () =>{
    console.log('server is runing ')
})