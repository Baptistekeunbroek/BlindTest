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
    const video = videos.find((v) => v.description.startsWith("Provided to YouTube by")) || videos.find((v) => [" - "].includes(v.title)) || videos[0];
    if (!video) return null;
    if (video.description.startsWith("Provided to YouTube by")) {
      // has to refind the song with the videoId in order to get the full description
      const song = await yts({ videoId: video.videoId });
      return formatSong(song);
    }
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
    const song = playlist[room].tracks?.[randIndex];
    if (!song) return null;
    playlist[room].tracks = playlist[room].tracks.filter((s) => s.videoId !== song.videoId);

    setCurrentSong({ room, song });
    return song;
  } else if (playlist[room].source === "Spotify") {
    const currentSong = playlist[room].tracks?.[randIndex];
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
    // the 3rd line of the description is : title · artist
    const description = video.description.split("\n")[2];
    const artist = description ? description.split(" · ")[1]?.trim() : video.author.name;
    const song = description ? description.split(" · ")[0]?.trim() : video.title;
    return {
      videoId: video.videoId,
      artist: artist.replace(removeUselessStuffRegex, ""),
      song: song.replace(removeUselessStuffRegex, ""),
      thumbnail: video.thumbnail,
      type: "artistAndSong", // this is used to know if we have to search for the artist and song title or only the title
    };
  }

  // this regex is used to split the title into artist and song title
  const regex = /[-:_,]\s/;
  // this regex is used to remove feat, ft, etc... from the song title
  const regSong = RegExp("[:&,]\\s|Ft\\.\\s|ft\\.\\s|Ft\\s|ft\\s|Feat|feat|\\s\\|\\s", "g");

  const regexResult = video?.title?.split(regex);
  if (regexResult?.length < 2)
    return {
      title: video.title?.split(regSong)[0],
      videoId: video.videoId,
      thumbnail: video.thumbnail,
      type: "title",
    };

  const artist = regexResult[0]?.split(regSong)[0]?.trim();
  const song = regexResult[1]?.split(regSong)[0]?.replace(/"/g, "")?.trim();

  return {
    type: "artistAndSong",
    artist: artist,
    song: song,
    videoId: video.videoId,
    thumbnail: video.thumbnail,
  };
};

module.exports = { setPlaylist, getNextSong };
