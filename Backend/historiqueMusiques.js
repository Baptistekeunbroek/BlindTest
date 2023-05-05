const musiques = [];

function addMusique({ nom, photo, room }) {
  const musique = { nom, photo, room };
  musiques.push(musique);
}

function getMusiques({ room }) {
  const musiqueDeLaRoom = musiques.filter((musique) => musique.room === room);
  return [...new Set(musiqueDeLaRoom)];
}

module.exports = { addMusique, getMusiques };
