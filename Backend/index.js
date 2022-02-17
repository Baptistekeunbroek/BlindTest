const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const { Server } = require("socket.io");


const router = require('./router');

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

app.use(cors());
app.use(router);


//------------------------------------------------------------------------------------------------------------------------


io.on('connect', (socket) => {
    console.log('a user connected');

    socket.on('join', ({name,room}, callback) =>{
        console.log(name, room);

        // if (error){
        //     callback();
        // }

        
    })


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});




server.listen(process.env.PORT || 5000, () => console.log('server has started on port : 5000'));