const { key } = require("./config");
const axios = require("axios");

async function getYoutubePlaylist() {
  let data = await axios.get(
    "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLq8u60UdCtaXXZaCJ8QbsyUUdm7YnnDAT&key=" +
      key
  );
  data = data.data.items;
  return data;
}

module.exports = { getYoutubePlaylist };
