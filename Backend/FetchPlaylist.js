const { key } = require('./config');
const axios = require('axios');

async function getYoutubePlaylist() {
  let data = await axios.get(
    'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLq8u60UdCtaVPz2Cw0ML1zi1bgF6xenr2&key=' +
      key
  );
  data = data.data.items;
  return data;
}

module.exports = { getYoutubePlaylist };
