const express = require('express');
const router = express.Router();

const {
	getProducts,
	createProduct,
	showProduct,
	updateProduct,
	deleteProduct
} = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:id', showProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;