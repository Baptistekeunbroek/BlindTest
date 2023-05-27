const { Server } = require("socket.io");
const { addUser, removeUser, getUser, getUsersInRoom, updateUser } = require("../utils/users");
const { addMusique, getMusiques, clearRoom, getCurrentSong } = require("../utils/musicHistory");
const { getNextSong, setPlaylist } = require("../utils/playlist");
const stringSimilarity = require("string-similarity");

exports.connectToIoServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  async function nextSong(room) {
    const video = await getNextSong(room);
    if (!video) {
      io.to(room).emit("message", {
        user: "Console",
        text: "La playlist est vide, partie terminée !",
      });
      return;
    }
    if (video.type === "title") {
      addMusique({
        nom: video.title,
        photo: video.thumbnail,
        room: room,
      });
      io.to(room).emit("setUrl", {
        URL: video.videoId,
        title: video.title,
        type: "title",
      });
    } else if (video.type === "artistAndSong") {
      addMusique({
        nom: `${video.artist} - ${video.song}`,
        photo: video.thumbnail,
        room: room,
      });
      io.to(room).emit("setUrl", {
        URL: video.videoId,
        title: `${video.artist} - ${video.song}`,
        type: "artistAndSong",
      });
    }
  }

  function resetVoteOfRoom(room) {
    const users = getUsersInRoom(room);
    users.forEach((user) => {
      updateUser(user.id, "goodAnswer", { artist: false, song: false, title: false });
    });
  }

  io.on("connect", (socket) => {
    socket.on("join", async ({ name, room }, callback) => {
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

      callback(user);
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

    socket.on("readyToPlay", () => {
      const user = getUser(socket.id);
      io.to(user.room).emit("timer30");
    });

    socket.on("start", async ({ playlistId }, callback) => {
      const user = getUser(socket.id);

      if (user.admin) {
        const resPlaylist = await setPlaylist(playlistId || undefined, user.room);
        if (resPlaylist?.error) return callback(resPlaylist.error);
        resetVoteOfRoom(user.room);
        const users = getUsersInRoom(user.room);
        io.to(user.room).emit("roomData", { users, musicHistory: getMusiques(user.room) });
        nextSong(user.room);
      }
    });

    socket.on("putUrl", () => {
      const user = getUser(socket.id);

      if (user.admin) {
        resetVoteOfRoom(user.room);
        const users = getUsersInRoom(user.room);
        io.to(user.room).emit("roomData", { users, musicHistory: getMusiques(user.room) });
        nextSong(user.room);
      }
    });
    socket.on("guessAnswer", async (guess) => {
      const user = getUser(socket.id);
      const currentSong = getCurrentSong(user.room);
      if (!currentSong) return;
      let users = null;
      let verify = false;
      guess = guess.toLowerCase().trim();
      if (currentSong.type === "artistAndSong") {
        if (user.goodAnswer.artist === true && user.goodAnswer.song === true) return socket.emit("goodAnswer", { message: "Vous avez déjà trouvé la réponse !" });
        else {
          if (user.goodAnswer.artist === false) {
            const artistSimilarity = stringSimilarity.compareTwoStrings(guess, currentSong.artist.toLowerCase().trim());
            if (artistSimilarity > 0.75) {
              updateUser(user.id, "score", (user.score || 0) + 1);
              updateUser(user.id, "goodAnswer", { artist: true, song: user.goodAnswer.song });
              socket.emit("goodAnswer", { message: "Vous avez trouvé l'artiste !" });
            }
          }
          if (user.goodAnswer.song === false) {
            const songSimilarity = stringSimilarity.compareTwoStrings(guess, currentSong.song.toLowerCase().trim());
            if (songSimilarity > 0.75) {
              updateUser(user.id, "score", (user.score || 0) + 1);
              updateUser(user.id, "goodAnswer", { song: true, artist: user.goodAnswer.artist });
              socket.emit("goodAnswer", { message: "Vous avez trouvé le titre !" });
            }
          }
        }

        users = getUsersInRoom(user.room);
        verify = users.every((user) => user.goodAnswer.artist === true && user.goodAnswer.song === true);
      } else {
        if (user.goodAnswer.title === true) return socket.emit("goodAnswer", { message: "Vous avez déjà trouvé la réponse !" });
        const titleSimilarity = stringSimilarity.compareTwoStrings(guess, currentSong.title.toLowerCase().trim());
        if (titleSimilarity > 0.75) {
          updateUser(user.id, "score", (user.score || 0) + 1);
          updateUser(user.id, "goodAnswer", { title: true });
          socket.emit("goodAnswer", { message: "Vous avez trouvé le titre !" });
          users = getUsersInRoom(user.room);
          verify = users.every((user) => user.goodAnswer.title === true);
        }
      }
      users && io.to(user.room).emit("roomData", { users });

      if (verify) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        resetVoteOfRoom(user.room);
        io.to(user.room).emit("roomData", { users, musicHistory: getMusiques(user.room) });
        nextSong(user.room);
      }
    });

    socket.on("disconnect", () => {
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.room).emit("message", {
          user: "Console",
          text: `${user.name} a quitté la salle`,
        });

        const users = getUsersInRoom(user.room);
        if (users?.length > 0) {
          io.to(user.room).emit("roomData", { users });
        } else {
          clearRoom(user.room);
        }
      }
    });
  });
};
