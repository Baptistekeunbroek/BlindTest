const mongoose = require("mongoose");

const MODELNAME = "Spotify";

const Schema = new mongoose.Schema(
  {
    accessToken: { type: String },
    expiresAt: { type: Number },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const SpotifyModel = mongoose.model(MODELNAME, Schema);
module.exports = SpotifyModel;
