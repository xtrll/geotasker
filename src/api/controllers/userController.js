import User from '../models/userSchema.js';

// eslint-disable-next-line import/prefer-default-export
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password, // is hashed inside userSchema
    });
    const user = await newUser.save();

    res.json({
      success: true,
      message: 'User successfully registered!',
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (e) {
    res.status(500).json({ message: 'Error creating user', e: e.message });
  }
};
