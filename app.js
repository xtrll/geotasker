import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './src/api/routes/userRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster.${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}`;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to ${process.env.DB_NAME} database.`);

    app.listen(PORT, () => {
      console.log(`Running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB database:', err);
  });

app.use(express.json());

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('GeoTasker API Running');
});

app.use((req, res) => {
  res.status(404).send('Page not found');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});
