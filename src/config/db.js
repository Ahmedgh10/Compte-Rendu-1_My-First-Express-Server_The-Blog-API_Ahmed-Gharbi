const mongoose = require('mongoose');

async function connectDB(uri) {
  if (!uri) {
    throw new Error('MongoDB URI is missing from environment variables (.env)');
  }
  await mongoose.connect(uri, {
    autoIndex: true // builds indexes (e.g. unique email) in development
  });
  console.log('MongoDB Atlas connection established successfully!');
}

module.exports = connectDB;
