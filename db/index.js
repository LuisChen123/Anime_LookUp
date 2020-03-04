const mongoose = require('mongoose');

const DB_URL = 'mongodb://<dbuser>:<dbpassword>@ds241977.mlab.com:41977/heroku_jx795bwm';
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
