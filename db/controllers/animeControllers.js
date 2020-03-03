const animeModel = require('../models/animeModels');

const addNewAnime = (bundle, callback) => {
  animeModel.insertMany(bundle, (err, result) => {
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
