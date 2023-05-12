const yts = require("yt-search");
const { searchPlaylist } = require("./utils/spotifyTracks");
const playlist = {};

async function setPlaylist(id = "PLq8u60UdCtaVPz2Cw0ML1zi1bgF6xenr2", room) {
  try {
    playlist[room] = {};
    if (id.startsWith("https://open.spotify.com/playlist/")) {
      id = id.split("/playlist/")[1];
      id = id.split("?")[0];
      const data = await searchPlaylist(id);
      if (!data.ok) return { error: data.error };
      playlist[room].tracks = data.data;
      playlist[room].source = "Spotify";
      return;
    }
    const regex = /(?<=list=)(.*?)(?=&|$)/;
    id = id?.match(regex)?.[0] || id;

    const list = await yts({ listId: id });

    const videos = list?.videos?.map((video) => formatSong(video));
    playlist[room].tracks = videos;
    playlist[room].source = "Youtube";
    return;
  } catch (error) {
    console.log(error);
    return { error: "Playlist not found" };
  }
}

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const searchSong = async (query) => {
  try {
    const { videos } = await yts(query);
    const video = videos.find((video) => video.description.startsWith("Provided to YouTube by")) || videos[0];
    return formatSong(video);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getNextSong = async (room) => {
  const taille = playlist[room]?.tracks?.length;
  if (!taille) return null;
  const randIndex = between(0, taille);
  if (playlist[room].source === "Youtube") {
    // return the song and remove it from the playlist
    return playlist[room].tracks.splice(randIndex, 1)[0];
  } else if (playlist[room].source === "Spotify") {
    const currentSong = playlist[room].tracks[randIndex];
    const song = await searchSong(`${currentSong.artist} ${currentSong.name} audio`);
    if (!song) return null;
    // return the song and remove it from the playlist
    playlist[room].tracks.splice(randIndex, 1)[0];
    return song;
  }
};

const formatSong = (video) => {
  const RemoveUselessStuffRegex = /[\[\(].*?[\]\)]/g;

  if (video?.description?.startsWith("Provided to YouTube by")) {
    return {
      title: `${video.author.name} - ${video.title.replace(RemoveUselessStuffRegex, "")?.trim()}`,
      videoId: video.videoId,
      thumbnail: video.thumbnail,
    };
  }
  return {
    title: video.title.replace(RemoveUselessStuffRegex, "")?.trim(),
    videoId: video.videoId,
    thumbnail: video.thumbnail,
  };
};

module.exports = { setPlaylist, getNextSong };
