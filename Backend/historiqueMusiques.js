const musiques = [];

function addMusique({ nom, photo, room }) {
  const musique = { nom, photo, room };
  musiques.push(musique);
}

function GetMusiques({ room }) {
  const musiqueDeLaRoom = [];
  for (let i = 0; i < musiques.length; i++) {
    // console.log(musiques[i].room);
    // console.log(room);
    if (musiques[i].room === room) {
      musiqueDeLaRoom.push(musiques[i]);
    }
  }
  return [...new Set(musiqueDeLaRoom)];
}

module.exports = { addMusique, GetMusiques };
