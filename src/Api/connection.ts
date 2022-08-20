import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_DB_URI = process.env.MONGO_DB_URI as string;

const connectToDatabase = () => {
  mongoose.connect(MONGO_DB_URI);
};

export default connectToDatabase;
