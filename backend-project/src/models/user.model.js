const db = require('../config/db.config');

exports.createUser = (userData, callback) => {
  db.query('INSERT INTO User SET ?', userData, callback);
};

exports.findByUsername = (username, callback) => {
  db.query('SELECT * FROM User WHERE username = ?', [username], callback);
};

exports.findById = (id, callback) => {
  db.query('SELECT * FROM User WHERE id = ?', [id], callback);
};
