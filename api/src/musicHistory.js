const musiques = {};

function addMusique({ nom, photo, room }) {
  const musique = { nom, photo };
  musiques[room] = musiques[room] ? [...musiques[room], musique] : [musique];
}

function getMusiques(room) {
  return musiques[room];
}

function clearRoom(room) {
  musiques[room] = [];
}

module.exports = { addMusique, getMusiques, clearRoom };
