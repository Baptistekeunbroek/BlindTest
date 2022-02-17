const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const { Server } = require("socket.io");

const  {addUser, removeUser, getUser, getUsersInRoom} = require('./Users');

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
    socket.on('join', ({name,room}, callback) =>{
        const {error, user} = addUser({id:socket.id, name,room})

        if (error){
            return callback(error);
        }

        socket.emit('message', {user : 'Console', text: user.name + ' welcome to the room' + user.room})

        socket.join(user.room);
    })


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});




server.listen(process.env.PORT || 5000, () => console.log('server has started on port : 5000'));