const db = require('../config/db.config');

// CREATE - Add stock out
exports.addStockOut = (data, callback) => {
  const { StockOutQuantity, StockOutUnitPrice, StockOutTotalPrice, StockOutDate, Name } = data;
  db.query(
    'INSERT INTO Stock_Out SET ?',
    { StockOutQuantity, StockOutUnitPrice, StockOutTotalPrice, StockOutDate, Name },
    callback
  );
};

// READ - Get all stock out records
exports.getAllStockOut = callback => {
  db.query('SELECT * FROM Stock_Out', callback);
};

// READ - Get a specific stock out record by ID (if you have a primary key)
// Note: If your table doesn’t have a unique identifier like `id`, you’ll need to query differently (e.g. by name + date).
exports.getStockOutByNameAndDate = (Name, StockOutDate, callback) => {
  db.query(
    'SELECT * FROM Stock_Out WHERE Name = ? AND StockOutDate = ?',
    [Name, StockOutDate],
    callback
  );
};

// UPDATE - Update stock out record
exports.updateStockOut = (Name, StockOutDate, data, callback) => {
  const { StockOutQuantity, StockOutUnitPrice, StockOutTotalPrice } = data;
  db.query(
    'UPDATE Stock_Out SET StockOutQuantity = ?, StockOutUnitPrice = ?, StockOutTotalPrice = ? WHERE Name = ? AND StockOutDate = ?',
    [StockOutQuantity, StockOutUnitPrice, StockOutTotalPrice, Name, StockOutDate],
    callback
  );
};

// DELETE - Delete stock out record
exports.deleteStockOut = (Name, StockOutDate, callback) => {
  db.query(
    'DELETE FROM Stock_Out WHERE Name = ? AND StockOutDate = ?',
    [Name, StockOutDate],
    callback
  );
};
