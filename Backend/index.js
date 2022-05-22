const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getAdmin,
} = require('./Users');
const { addMusique, GetMusiques } = require('./historiqueMusiques');
const { getYoutubePlaylist } = require('./FetchPlaylist');
const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(router);

//------------------------------------------------------------------------------------------------------------------------

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function getPlay() {
  return await getYoutubePlaylist();
}

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log('user joined');
    if (error) {
      return callback(error);
    }

    socket.emit('message', {
      user: 'Console',
      text: user.name + ' bienvenue dans le salon  ' + user.room,
    });

    socket.broadcast.to(user.room).emit('message', {
      user: 'Console',
      text: user.name + ' s' + "'" + 'est connecté !!',
    });

    socket.join(user.room);

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on('similaire90', () => {
    const user = getUser(socket.id);
    console.log('Similaire de fou');
    io.to(user.room).emit('bonneReponse', { user: user.name });
  });

  socket.on('pretLancer', () => {
    const user = getUser(socket.id);

    io.to(user.room).emit('timer30');
  });

  socket.on('MAJMusiques', () => {
    const user = getUser(socket.id);
    console.log('MAJ');
    const listeMusiques = GetMusiques({ room: user.room });

    io.to(user.room).emit('voiciLaListe', { listeMusiques });
  });

  socket.on('putUrl', () => {
    const user = getUser(socket.id);
    const Admin = getAdmin({ room: user.room });

    if (user.id == Admin.id) {
      getPlay().then((youtube) => {
        console.log('API');

        const taille = youtube.length;
        const randIndex = between(0, taille);
        // console.log(youtube[randIndex]);

        // console.log(youtube[randIndex].snippet.thumbnails);
        addMusique({
          nom: youtube[randIndex].snippet.title,
          photo: youtube[randIndex].snippet.thumbnails.high.url,
          room: user.room,
        });

        io.to(user.room).emit('setUrl', {
          URL: youtube[randIndex].snippet.resourceId.videoId,
          title: youtube[randIndex].snippet.title,
        });
      });
    }
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', {
        user: 'console',
        text: user.name + ' est parti',
      });
      io.to(user.room).emit('estParti', { user });
    }
    console.log('user disconnected');
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log('server has started on port : 5000')
);
