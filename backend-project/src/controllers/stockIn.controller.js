const StockIn = require('../models/stockIn.model');
const SparePart = require('../models/sparePart.model');

// CREATE - Add stock-in + increase quantity
exports.add = (req, res) => {
  const { Name, StockInQuantity } = req.body;

  // Step 1: Get current quantity
  SparePart.getSparePartByName(Name, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Spare part not found' });

    const currentQty = results[0].Quantity;

    // Step 2: Insert Stock_In record
    StockIn.addStockIn(req.body, (err, insertResult) => {
      if (err) return res.status(500).json({ error: err });

      // Step 3: Update quantity in Spare_Part
      const newQty = currentQty + StockInQuantity;
      SparePart.updateSparePart(Name, { Quantity: newQty }, (err, updateResult) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Stock-In recorded', id: insertResult.insertId });
      });
    });
  });
};

// READ all
exports.getAll = (req, res) => {
  StockIn.getAllStockIn((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// READ by name + date
exports.getOne = (req, res) => {
  const { name, date } = req.params;
  StockIn.getStockInByNameAndDate(name, date, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Record not found' });
    res.json(results[0]);
  });
};

// UPDATE
exports.update = (req, res) => {
  const { name, date } = req.params;
  StockIn.updateStockIn(name, date, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Stock-In record updated' });
  });
};

// DELETE
exports.remove = (req, res) => {
  const { name, date } = req.params;
  StockIn.deleteStockIn(name, date, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Stock-In record deleted' });
  });
};
