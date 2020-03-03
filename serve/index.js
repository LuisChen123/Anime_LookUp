const express = require('express');

const Axios = require('axios');

const API = 'https://api.jikan.moe/v3/anime/';

const app = express();

const path = require('path');

const bodyParser = require('body-parser'); /*  middleware that handle post from front end */

const Mongo = require('../db/index');

const animeController = require('../db/controllers/animeControllers');

const port = 8081;

const originUrl = '*';

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', originUrl);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json()); // conveart to json file
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '../dist')));

app.get('/api/add', (request, response) => {
  let id = request.query.id;

  Axios.get(`${API}${id}`)
    .then(function(result) {
      const bundleFile = {
        mal_id: result.data.mal_id,
        url: result.data.url,
        image_url: result.data.image_url,
        trailer_url: result.data.trailer_url,
        title: result.data.title,
        title_english: result.data.title_english,
        title_japanese: result.data.title_japanese,
        type: result.data.type,
        episodes: result.data.episodes,
        duration: result.data.duration,
        rating: result.data.rating,
        score: result.data.score,
        scored_by: result.data.scored_by,
        rank: result.data.rank,
        popularity: result.data.popularity,
        favorites: result.data.favorites,
        synopsis: result.data.synopsis
      };
      animeController.addNewAnime(bundleFile, (err, results) => {
        if (err) {
          response.send(err.errmsg);
        } else {
          console.log(results);
          response.send(`Anime: "${result.data.title}" added to your fav anime list`);
        }
      });
    })
    .catch(function(error) {
      response.send(error + 'catchErr');
    });
});

app.delete('/api/delete', (request, response) => {
  let id = request.query.id;
  animeController.removeFavAnime(id, (err, result) => {
    if (err) {
      response.send(err.errmsg);
    } else {
      response.send(`Anime Id:${id} deleted from database`);
    }
  });
});

app.listen(port, () => console.log(`listening on port ${port}!`));
