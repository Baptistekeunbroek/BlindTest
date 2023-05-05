const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { addUser, removeUser, getUser, getUsersInRoom, getAdmin } = require("./Users");
const { addMusique, getMusiques } = require("./historiqueMusiques");
const { getYouTubePlaylist } = require("./FetchPlaylist");
const router = require("./router");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(router);

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function getPlay() {
  return await getYouTubePlaylist();
}

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      return callback(error);
    }

    socket.emit("message", {
      user: "Console",
      text: `${user.name}, bienvenue dans la salle ${user.room} !`,
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "Console",
      text: `${user.name} s'est connecté !`,
    });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("similaire90", () => {
    const user = getUser(socket.id);
    io.to(user.room).emit("bonneReponse", { user: user.name });
  });

  socket.on("pretLancer", () => {
    const user = getUser(socket.id);

    io.to(user.room).emit("timer30");
  });

  socket.on("MAJMusiques", () => {
    const user = getUser(socket.id);
    const listeMusiques = getMusiques({ room: user.room });

    io.to(user.room).emit("voiciLaListe", { listeMusiques });
  });

  socket.on("putUrl", () => {
    const user = getUser(socket.id);
    const Admin = getAdmin({ room: user.room });

    if (user.id == Admin.id) {
      getPlay().then((YouTube) => {
        const taille = YouTube.length;
        const randIndex = between(0, taille);
        addMusique({
          nom: YouTube[randIndex].title,
          photo: YouTube[randIndex].thumbnail,
          room: user.room,
        });

        io.to(user.room).emit("setUrl", {
          URL: YouTube[randIndex].videoId,
          title: YouTube[randIndex].title,
        });
      });
    }
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "Console",
        text: `${user.name} a quitté la salle`,
      });
      io.to(user.room).emit("estParti", { user });
    }
  });
});

server.listen(process.env.PORT || 5000, () => console.log("server has started on port : 5000"));
