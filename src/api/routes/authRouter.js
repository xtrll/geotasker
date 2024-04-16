import express from 'express';
import { authenticateUser } from '../services/authService.js';

const router = express.Router();

router.post('/auth', async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await authenticateUser(username, password);
    res.json({ token });
  } catch (e) {
    res.status(401).json([e.message]);
  }
});

export default router;
