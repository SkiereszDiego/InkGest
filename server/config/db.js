const mongoose = require('mongoose');

// Replace the URI with your MongoDB connection string
const MONGODB_URI = 'mongodb+srv://diegoskieresz:g5NsIeFuyXBS94Hm@cluster0.whimurx.mongodb.net/';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
