const animeModel = require('../models/animeModels');

const addNewUser = (userInfo, callback) => {
  animeModel.userInfo.insertMany(userInfo, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const addNewAnime = (bundle, callback) => {
  animeModel.Anime.insertMany(bundle, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const removeFavAnime = (id, callback) => {
  animeModel.findOneAndDelete({ mal_id: id }, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports.addNewAnime = addNewAnime;
module.exports.removeFavAnime = removeFavAnime;
module.exports.addNewUser = addNewUser;
