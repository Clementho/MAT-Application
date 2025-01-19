require('dotenv').config();

const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')

const connect = async () => {
  const uri = process.env.MONGO_ATLAS_CLUSTER_URI;
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the DB');
  } catch (error) {
    console.error('Error connecting to the DB:', error);
    throw error;
  }
};


module.exports = { connect };
