const SpotifyModel = require("../models/spotify");
const axios = require("axios");
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = require("../config");

async function searchPlaylist(playlistId) {
  try {
    if (!playlistId) return { error: "Query is required", ok: false };
    const accessToken = await getSpotifyAccessToken();
    if (!accessToken) return { error: "Server error", ok: false };
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = response?.data?.tracks?.items?.map((item) => {
      item = item.track;
      return {
        name: item.name,
        artist: item.artists[0].name,
        id: item.id,
      };
    });

    if (!data) return { error: "Not found", ok: false };

    return { data, ok: true };
  } catch (error) {
    console.log(error);
    return { error: "Server error", ok: false };
  }
}

async function getSpotifyAccessToken() {
  try {
    let token = await SpotifyModel.findOne({});
    if (token) {
      if (token.expiresAt > Date.now()) {
        return token.accessToken;
      }
      await SpotifyModel.deleteOne({});
    }
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
      })
    );
    const { access_token, expires_in } = response.data;
    const expiresAt = Date.now() + expires_in * 1000;
    await SpotifyModel.create({ accessToken: access_token, expiresAt });
    return access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = { searchPlaylist };
