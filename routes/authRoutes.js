const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Error logging in', err });
    if (!user) return res.status(401).json({ message: info.message });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  })(req, res, next);
});

// Logout route
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Error logging out', err });
    res.status(200).json({ message: 'Logout successful' });
  });
});

module.exports = router;
