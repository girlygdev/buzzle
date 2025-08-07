const express = require('express');
const router = express.Router();

const { 
	getCategories,
	createCategory,
	showCategory,
	updateCategory,
	deleteCategory
} = require('../controllers/categoryController');

router.get('/', getCategories);
router.post('/', createCategory);
router.get('/:id', showCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
