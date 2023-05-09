const yts = require("yt-search");
let playlist = null;

async function setPlaylist(id = "PLq8u60UdCtaVPz2Cw0ML1zi1bgF6xenr2") {
  const list = await yts({ listId: id });
  playlist = list.videos;
  return playlist;
}

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const getNextSong = () => {
  const taille = playlist.length;
  if (taille === 0) return null;
  const randIndex = between(0, taille);
  // return the song and remove it from the playlist
  return playlist.splice(randIndex, 1);
};

module.exports = { setPlaylist, getNextSong };
