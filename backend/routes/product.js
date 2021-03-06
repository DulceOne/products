const express = require('express');

const router = express.Router();
const product = require('../controllers/product');
const auth = require('../middleware/auth');

router.post('/', auth, product.create);
router.post('/duplicate', auth, product.createTestItem);
router.get('/', auth, product.read);
router.get('/:id', auth, product.readById);
router.patch('/:id', auth, product.update);
router.delete('/:id', auth, product.delete);

module.exports = router;
