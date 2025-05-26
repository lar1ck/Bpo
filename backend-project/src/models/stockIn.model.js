const db = require('../config/db.config');

// CREATE
exports.addStockIn = (data, callback) => {
  const { StockInQuantity, StockInDate, Name } = data;
  db.query(
    'INSERT INTO Stock_In SET ?',
    { StockInQuantity, StockInDate, Name },
    callback
  );
};

// READ - all
exports.getAllStockIn = callback => {
  db.query('SELECT * FROM Stock_In', callback);
};

// READ - by Name + Date
exports.getStockInByNameAndDate = (name, date, callback) => {
  db.query('SELECT * FROM Stock_In WHERE Name = ? AND StockInDate = ?', [name, date], callback);
};

// UPDATE
exports.updateStockIn = (name, date, data, callback) => {
  db.query(
    'UPDATE Stock_In SET ? WHERE Name = ? AND StockInDate = ?',
    [data, name, date],
    callback
  );
};

// DELETE
exports.deleteStockIn = (name, date, callback) => {
  db.query(
    'DELETE FROM Stock_In WHERE Name = ? AND StockInDate = ?',
    [name, date],
    callback
  );
};
