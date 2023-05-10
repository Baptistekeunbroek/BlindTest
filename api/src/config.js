const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/example";
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const SECRET = process.env.SECRET || "secret";
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

console.log("💻 NODE_ENV: ", NODE_ENV, MONGO_URI);

module.exports = {
  MONGO_URI,
  PORT,
  NODE_ENV,
  SECRET,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
};
