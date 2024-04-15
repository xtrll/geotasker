import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './src/api/routes/userRouter.js';
import authRouter from './src/api/routes/authRouter.js';
import authMiddleware from "./src/api/middleware/authMiddleware.js";
import bodyParser from "body-parser";

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
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Authorization Page' });
});
app.get('/login', (req, res) => {
    res.render('login', {title: 'Login Page'});
})

app.use('/user', userRouter);
app.use('/login', authRouter);

app.use((req, res) => {
  res.status(404).send('Page not found');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});
