const db = require('../config/db.config');

// Get all spare parts
exports.getAllSpareParts = callback => {
  db.query('SELECT * FROM Spare_Part', callback);
};

// Get a single spare part by Name (primary key)
exports.getSparePartByName = (Name, callback) => {
  db.query('SELECT * FROM Spare_Part WHERE Name = ?', [Name], callback);
};

// Create a new spare part
exports.createSparePart = (data, callback) => {
  const { Name, Category, Quantity, UnitPrice, TotalPrice } = data;
  db.query(
    'INSERT INTO Spare_Part SET ?',
    { Name, Category, Quantity, UnitPrice, TotalPrice },
    callback
  );
};

// Update a spare part by Name
exports.updateSparePart = (Name, data, callback) => {
  const { Category, Quantity, UnitPrice, TotalPrice } = data;
  db.query(
    'UPDATE Spare_Part SET Category = ?, Quantity = ?, UnitPrice = ?, TotalPrice = ? WHERE Name = ?',
    [Category, Quantity, UnitPrice, TotalPrice, Name],
    callback
  );
};

// Delete a spare part by Name
exports.deleteSparePart = (Name, callback) => {
  db.query('DELETE FROM Spare_Part WHERE Name = ?', [Name], callback);
};
