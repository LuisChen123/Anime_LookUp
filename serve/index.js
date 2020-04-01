const express = require('express');

const Axios = require('axios');

const API = 'https://api.jikan.moe/v3/anime/';

const app = express();

const path = require('path');

const bodyParser = require('body-parser'); /*  middleware that handle post from front end */

const Mongo = require('../db/index');

const animeController = require('../db/controllers/animeControllers');

const PORT = process.env.PORT || 8081;

const originUrl = '*';

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', originUrl);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json()); // conveart to json file
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '../dist')));

// register user
app.post('/register', (request, response) => {
  const userInfo = request.body;
  // add this new user information to databse
  animeController.addNewUser(userInfo, (err, result) => {
    if (err) {
      response.send(err);
    } else {
      console.log(result);
      response.send(result);
    }
  });
});

// handle user login authertion
app.post('/login', (request, response) => {
  const userInfo = request.body;
  const userPassWord = request.body.password;

  animeController
    .userLogin(userInfo)
    .then(result => {
      if (result === null) {
        // 0 means there is no such user
        response.send('0');
      } else if (result !== undefined && result.passWord !== userPassWord) {
        // 1 means the password is not correct
        response.send('1');
      } else if (result !== undefined && result.passWord !== userPassWord) {
        // 2 means the password is correct
        response.send('2');
      }
    })
    .catch(error => {
      // 3 means there is something wrong with database
      console.log(error);
      response.send('3');
    });
});

app.get('/api/add', (request, response) => {
  const { id } = request.query;

  Axios.get(`${API}${id}`)
    .then(function(result) {
      console.log(result);
      const bundleFile = {
        mal_id: result.data.mal_id,
        url: result.data.url,
        image_url: result.data.image_url,
        trailer_url: result.data.trailer_url,
        title: result.data.title,
        title_english: result.data.title_english,
        title_japanese: result.data.title_japanese,
        title_synonyms: result.data.title_synonyms,
        type: result.data.type,
        source: result.data.source,
        status: result.data.status,
        episodes: result.data.episodes,
        duration: result.data.duration,
        rating: result.data.rating,
        airing: result.data.airing,
        score: result.data.score,
        aired: result.data.aired,
        scored_by: result.data.scored_by,
        rank: result.data.rank,
        popularity: result.data.popularity,
        favorites: result.data.favorites,
        synopsis: result.data.synopsis,
        background: result.data.background,
        premiered: result.data.premiered,
        broadcast: result.data.broadcast,
        related: result.data.related,
        producers: result.data.producers,
        licensors: result.data.licensors,
        studios: result.data.studios,
        genres: result.data.genres,
        opening_themes: result.data.opening_themes,
        ending_themes: result.data.ending_themes
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
      response.send(`${error} catchErr`);
    });
});

app.delete('/api/delete', (request, response) => {
  const { id } = request.query;
  animeController.removeFavAnime(id, (err, result) => {
    console.log(result);
    if (err) {
      response.send(err.errmsg);
    } else {
      response.send(`Anime Id:${id} deleted from database`);
    }
  });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
