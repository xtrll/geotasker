import express from 'express';
import userRouter from './src/api/routes/userRouter';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('GeoTasker API Running');
});

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
