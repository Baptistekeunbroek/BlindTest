const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const { Server } = require("socket.io");
const axios = require('axios')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./Users');
const config = require('./config')
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
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })
        console.log("user joined")
        if (error) {
            return callback(error);
        }

        socket.emit('message', { user: 'Console', text: user.name + ' welcome to the room ' + user.room })

        socket.broadcast.to(user.room).emit('message', { user: 'Console', text: user.name + 'has joined !!' })

        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });


        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

        callback();

    });

    socket.on('putUrl',async () =>{
        const user = getUser(socket.id);

        async function getYoutubePlaylist(){
            let data = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLFFGmz6nJTieHdFyftKuo_E_GLTUeDurd&key=' + config.key)
            console.log(data)
            data = data.data.items;
            return data
        }
        const youtube = await getYoutubePlaylist();
        console.log(youtube)
        //const youtube = 'https://www.youtube.com/watch?v=XmE5qkNDPIE';

        io.to(user.room).emit('setUrl', youtube);

        //callback();

    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', { user: "console", text: user.name + " has left" })
        }
        console.log('user disconnected');
    });
});




server.listen(process.env.PORT || 5000, () => console.log('server has started on port : 5000'));