const express = require('express');
const router = express.Router();
const controller = require('../controllers/sparePart.controller');

// GET all spare parts
router.get('/', controller.getAll);

// GET a specific spare part by name
router.get('/:name', controller.getOne);

// POST a new spare part
router.post('/', controller.create);

// PUT (update) an existing spare part by name
router.put('/:name', controller.update);

// DELETE a spare part by name
router.delete('/:name', controller.remove);

module.exports = router;
