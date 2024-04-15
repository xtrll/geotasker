import jwt from 'jsonwebtoken';
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export const generateToken = (userId) => {
  const payload = {
    user: {
      id: userId,
    },
  };

  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '24h' },
  );
};

export const authenticateUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return generateToken(user.id);
}

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
