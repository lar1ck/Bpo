const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


exports.register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password are required' });

  User.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0)
      return res.status(409).json({ message: 'Username already exists' });

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ error: err });

      User.createUser({ username, password: hash }, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password required' });

  User.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(401).json({ message: 'Invalid username or password' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err });
      if (!isMatch)
        return res.status(401).json({ message: 'Invalid username or password' });

      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      // Send token as HTTP-only cookie for session
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, // Set true if HTTPS
        maxAge: 3600000, // 1 hour
      });

      res.json({ message: 'Login successful', token });
    });
  });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};
