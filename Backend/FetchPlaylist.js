const yts = require("yt-search");

async function getYouTubePlaylist() {
  const list = await yts({ listId: "PLq8u60UdCtaVPz2Cw0ML1zi1bgF6xenr2" });

  return list.videos;
}

module.exports = { getYouTubePlaylist };
