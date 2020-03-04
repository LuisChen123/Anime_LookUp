const mongoose = require('mongoose');

const MongoDBPassWord = require('../config');

const DB_URL = `mongodb+srv://luis:${MongoDBPassWord}@cluster0-vv08g.mongodb.net/test?retryWrites=true&w=majority`;
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
