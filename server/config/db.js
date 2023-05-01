const mongoose = require('mongoose');

// Replace the URI with your MongoDB connection string
const MONGODB_URI = 'mongodb://localhost:27017';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
