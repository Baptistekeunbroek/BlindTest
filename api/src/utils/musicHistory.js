const musiquesHistory = {};
const currentSong = {};

function addMusique({ nom, photo, room }) {
  const musique = { nom, photo };
  musiquesHistory[room] = musiquesHistory[room] ? [...musiquesHistory[room], musique] : [musique];
}

function getMusiques(room) {
  return musiquesHistory[room];
}

function clearRoom(room) {
  musiquesHistory[room] = [];
}

function setCurrentSong({ room, song }) {
  currentSong[room] = song;
}

function getCurrentSong(room) {
  return currentSong[room];
}

module.exports = { addMusique, getMusiques, clearRoom, setCurrentSong, getCurrentSong };
