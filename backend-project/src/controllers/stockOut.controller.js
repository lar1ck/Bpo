const StockOut = require('../models/stockOut.model');
const SparePart = require('../models/sparePart.model');

// CREATE - Add stock out + decrease quantity
exports.add = (req, res) => {
  const { Name, StockOutQuantity } = req.body;

  // Step 1: Check current quantity
  SparePart.getSparePartByName(Name, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Spare part not found' });

    const currentQty = results[0].Quantity;
    if (currentQty < StockOutQuantity) {
      return res.status(400).json({ message: 'Not enough quantity in stock' });
    }

    // Step 2: Insert Stock_Out
    StockOut.addStockOut(req.body, (err, insertResult) => {
      if (err) return res.status(500).json({ error: err });

      // Step 3: Decrease quantity in Spare_Part
      const newQty = currentQty - StockOutQuantity;
      SparePart.updateSparePart(Name, { Quantity: newQty }, (err, updateResult) => {
        if (err) return res.status(500).json({ error: err });

        res.status(201).json({ message: 'Stock-Out recorded', id: insertResult.insertId });
      });
    });
  });
};

// READ - All Stock_Out
exports.getAll = (req, res) => {
  StockOut.getAllStockOut((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// READ - By Name + Date
exports.getOne = (req, res) => {
  const { name, date } = req.params;
  StockOut.getStockOutByNameAndDate(name, date, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Record not found' });
    res.json(results[0]);
  });
};

// UPDATE - Edit stock-out record
exports.update = (req, res) => {
  const { name, date } = req.params;
  StockOut.updateStockOut(name, date, req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Stock-Out record updated' });
  });
};

// DELETE - Delete stock-out record
exports.remove = (req, res) => {
  const { name, date } = req.params;
  StockOut.deleteStockOut(name, date, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Stock-Out record deleted' });
  });
};
