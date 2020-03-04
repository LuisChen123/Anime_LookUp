const express = require('express');

const app = express();

const path = require('path');

const bodyParser = require('body-parser'); /*  middleware that handle post from front end */

const Mongo = require('../db/index');

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

app.get('/api', (request, response) => {
  console.log('123');
});

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
