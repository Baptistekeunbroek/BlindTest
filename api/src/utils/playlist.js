const yts = require("yt-search");
const { searchPlaylist } = require("./spotifyTracks");
const { setCurrentSong } = require("./musicHistory");
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
    if (!list) return { error: "Playlist not found" };

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
    const song = playlist[room].tracks[randIndex];
    if (!song) return null;
    playlist[room].tracks = playlist[room].tracks.filter((song) => song.videoId !== song.videoId);

    setCurrentSong({ room, song });
    return song;
  } else if (playlist[room].source === "Spotify") {
    const currentSong = playlist[room].tracks[randIndex];
    const song = await searchSong(`${currentSong.artist} ${currentSong.name} audio`);
    if (!song) return null;
    // remove the song from the playlist
    playlist[room].tracks = playlist[room].tracks.filter((song) => song.id !== currentSong.id);

    setCurrentSong({ room, song });
    return song;
  }
};

const formatSong = (video) => {
  // remove useless stuff from the title, like [Official Video], (Official Video), etc...
  const removeUselessStuffRegex = /[\[\(].*?[\]\)]/g;
  video.title = video.title?.replace(removeUselessStuffRegex, "")?.trim();

  if (video?.description?.startsWith("Provided to YouTube by")) {
    return {
      videoId: video.videoId,
      artist: video.author.name,
      song: video.title,
      thumbnail: video.thumbnail,
      type: "artistAndSongTitle", // this is used to know if we have to search for the artist and song title or only the title
    };
  }

  // this regex is used to split the title into artist and song title
  const regex = /[-:_,]\s/;
  // this regex is used to remove feat, ft, etc... from the song title
  const regSong = RegExp("[:&,]\\s|Ft\\.\\s|ft\\.\\s|Feat|feat", "g");

  const regexResult = video?.title?.split(regex);
  if (regexResult?.length < 2)
    return {
      title: video.title?.split(regSong)[0],
      videoId: video.videoId,
      thumbnail: video.thumbnail,
      type: "title",
    };

  const artist = regexResult[0]?.split(regSong)[0]?.trim();
  const songTitle = regexResult[1]?.split(regSong)[0]?.replaceAll('"', "")?.trim();

  return {
    type: "artistAndSongTitle",
    artist: artist,
    song: songTitle,
    videoId: video.videoId,
    thumbnail: video.thumbnail,
  };
};

module.exports = { setPlaylist, getNextSong };
