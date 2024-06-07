import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      const savedUser = await newUser.save();
      return res.json(savedUser);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = { id: user.id, name: user.name };

      const token = jwt.sign(
        payload,
        'your-secret-key', // Replace with your actual secret key
        { expiresIn: 31556926 }
      );
      res.json({
        success: true,
        token: 'Bearer ' + token
      });
    } else {
      return res.status(400).json({ passwordincorrect: 'Password incorrect' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Password Reset - Request Reset
router.post('/request-reset-password', async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }

    const resetToken = jwt.sign({ id: user.id }, 'your-reset-secret-key', { expiresIn: '1h' });
    // Send this token to user's email in real application

    res.json({ success: true, message: 'Reset token sent to email', token: resetToken });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Password Reset - Reset Password
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded: any = jwt.verify(token, 'your-reset-secret-key');
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ usernotfound: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ success: true, message: 'Password has been reset' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;
