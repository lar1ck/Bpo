const express = require('express');
const router = express.Router();
const controller = require('../controllers/stockOut.controller');

// POST - Stock out + reduce spare part quantity
router.post('/', controller.add);

// GET all stock out records
router.get('/', controller.getAll);

// GET specific stock out record by name and date
router.get('/:name/:date', controller.getOne);

// PUT - Update a stock out record
router.put('/:name/:date', controller.update);

// DELETE - Delete a stock out record
router.delete('/:name/:date', controller.remove);

module.exports = router;
