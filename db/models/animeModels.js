const mongoose = require('mongoose');

const animeSchema = mongoose.Schema({
  mal_id: { type: String, unique: true },
  url: String,
  image_url: String,
  trailer_url: String,
  title: String,
  title_english: String,
  title_japanese: String,
  type: String,
  episodes: Number,
  duration: String,
  rating: String,
  score: Number,
  scored_by: Number,
  rank: Number,
  popularity: Number,
  favorites: Number,
  synopsis: String
});

const Anime = mongoose.model('anime', animeSchema);

module.exports = Anime;
