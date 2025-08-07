const express = require('express');
const router = express.Router();

const { 
	getCategories,
	createCategory,
	showCategory,
	updateCategory,
	deleteCategory,
	getCategoryProducts
} = require('../controllers/categoryController');

router.get('/', getCategories);
router.post('/', createCategory);
router.get('/:id', showCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

router.get('/:id/products', getCategoryProducts);

module.exports = router;
