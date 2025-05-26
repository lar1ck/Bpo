const express = require('express');
const router = express.Router();
const controller = require('../controllers/stockIn.controller');

// POST - Add stock in (and increase spare part quantity)
router.post('/', controller.add);

// GET all stock in records
router.get('/', controller.getAll);

// GET one by name and date
router.get('/:name/:date', controller.getOne);

// PUT - Update stock in record
router.put('/:name/:date', controller.update);

// DELETE stock in record
router.delete('/:name/:date', controller.remove);

module.exports = router;
