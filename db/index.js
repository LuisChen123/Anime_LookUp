const mongoose = require('mongoose');

const passwordConfig = require('../config');

const password = passwordConfig.MongoDBPassWord;

const DB_URL = `mongodb+srv://luis:${password}@cluster0-vv08g.mongodb.net/anime?retryWrites=true&w=majority`;
/** * mongoDb Url */
mongoose.set('useCreateIndex', true); // disable warning  (node:80792) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

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
