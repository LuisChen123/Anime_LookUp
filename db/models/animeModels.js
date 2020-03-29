const mongoose = require('mongoose');

const userInfoSchema = mongoose.Schema({
  userName: { type: String, unique: true },
  passWord: String,
  age: Number
});

const animeSchema = mongoose.Schema({
  userName: String,
  mal_id: { type: String, unique: true },
  url: String,
  image_url: String,
  trailer_url: String,
  title: String,
  title_english: String,
  title_japanese: String,
  type: String,
  episodes: Number,
  status: String,
  duration: String,
  rating: String,
  airing: Object,
  score: Number,
  aired: Object,
  scored_by: Number,
  rank: Number,
  popularity: Number,
  favorites: Number,
  synopsis: String,
  background: String,
  premiered: String,
  broadcast: String,
  related: Object,
  producers: Array,
  licensors: Array,
  studios: Array,
  genres: Array,
  opening_themes: Array,
  ending_themes: Array
});

const Anime = mongoose.model('anime', animeSchema);
const userInfo = mongoose.model('userInfo', userInfoSchema);

module.exports = {
  Anime,
  userInfo
};
