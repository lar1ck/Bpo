const SparePart = require('../models/sparePart.model');

// GET all spare parts
exports.getAll = (req, res) => {
  SparePart.getAllSpareParts((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// GET a single spare part by Name
exports.getOne = (req, res) => {
  const { name } = req.params;
  SparePart.getSparePartByName(name, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Spare part not found' });
    res.json(results[0]);
  });
};

// POST - Create a new spare part
exports.create = (req, res) => {
  SparePart.createSparePart(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Spare part added', id: results.insertId });
  });
};

// PUT - Update a spare part by Name
exports.update = (req, res) => {
  const { name } = req.params;
  SparePart.updateSparePart(name, req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Spare part not found' });
    res.json({ message: 'Spare part updated' });
  });
};

// DELETE - Remove a spare part by Name
exports.remove = (req, res) => {
  const { name } = req.params;
  SparePart.deleteSparePart(name, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Spare part not found' });
    res.json({ message: 'Spare part deleted' });
  });
};
