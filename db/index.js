const mongoose = require('mongoose');

<<<<<<< HEAD
const MongoDBPassWord = require('../config');

const DB_URL = `mongodb+srv://luis:${MongoDBPassWord}@cluster0-vv08g.mongodb.net/test?retryWrites=true&w=majority`;
=======
const DB_URL =
  'mongodb+srv://luis:c82806817@cluster0-vv08g.mongodb.net/test?retryWrites=true&w=majority/anime';
>>>>>>> 6e82122ef236f13ca04faa0975479b8fffb21ec6
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
