import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_DB_URL = process.env.MONGO_DB_URL;

const connectToDatabase = () => {
  if (typeof MONGO_DB_URL !== 'string') {
    throw new Error('MONGO_DB_URL is not a string');
  }
  mongoose.connect(MONGO_DB_URL);
};

export default connectToDatabase;
