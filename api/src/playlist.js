const yts = require("yt-search");
const playlist = {};

async function setPlaylist(id = "PLq8u60UdCtaVPz2Cw0ML1zi1bgF6xenr2", room) {
  try {
    const regex = /(?<=list=)(.*?)(?=&|$)/;
    id = id?.match(regex)?.[0] || id;

    const list = await yts({ listId: id });
    const RemoveUselessStuffRegex = /[\[\(].*?[\]\)]/g;

    const videos = list?.videos?.map((video) => ({
      title: video.title.replace(RemoveUselessStuffRegex, "")?.trim(),
      videoId: video.videoId,
      thumbnail: video.thumbnail,
    }));
    playlist[room] = videos;
    return;
  } catch (error) {
    return { error: "Playlist not found" };
  }
}

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const getNextSong = (room) => {
  const taille = playlist[room]?.length;
  if (!taille) return null;
  const randIndex = between(0, taille);
  // return the song and remove it from the playlist
  return playlist[room].splice(randIndex, 1)[0];
};

module.exports = { setPlaylist, getNextSong };
