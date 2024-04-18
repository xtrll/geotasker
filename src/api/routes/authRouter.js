import express from 'express';
import { authenticateUser } from '../services/authService.js';

const router = express.Router();

router.post('/auth', async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await authenticateUser(username, password);

    res.cookie('token', token, { httpOnly: true, secure: process.NODE_ENV === 'production', maxAge: 3600000 });
    res.status(200).json({ message: 'Logged in successfully' });
  } catch (e) {
    res.status(401).json([e.message]);
  }
});

export default router;
