const yts = require("yt-search");
let playlist = null;

async function setPlaylist(id = "PLq8u60UdCtaVPz2Cw0ML1zi1bgF6xenr2") {
  const list = await yts({ listId: id });
  playlist = list.videos;
  return playlist;
}

const getPlaylist = () => playlist;

module.exports = { setPlaylist, getPlaylist };
