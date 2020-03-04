const mongoose = require('mongoose');

const DB_URL = 'mongodb://<dbuser>:<dbpassword>@ds125048.mlab.com:25048/heroku_tc0hd4tm/anime';
/** * mongoDb Url */
mongoose.connect(DB_URL);

const db = mongoose.connection;

db.on('open', () => {
  // connection success
  console.log('MongoDB Connection Successed');
});

db.on('error', () => {
  // connection faild
  console.log('MongoDB Connection Error');
});

module.exports = db;
