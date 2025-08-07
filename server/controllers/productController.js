const Category = require('../models/category.model');
const Product = require('../models/product.model');
const { jsonResponseHelper } = require('../utils/Helper');

// @desc	List products with categroy
// @route	GET /api/products
exports.getProducts = async (req, res) => {
	try {
		const products = await Product.find().populate('category');

		return res
			.status(200)
			.json(jsonResponseHelper({
				message: 'Products list',
				data: products
			}));
	} catch (err) {
		return res
			.status(500)
			.json(jsonRcaesponseHelper({
				flag: "error",
				message: 'An error occured',
			}))
	}
};

// @desc Create product
// @route POST /api/products
exports.createProduct = async (req, res) => {
	try {
		const { name, price, category_id, ...rest } = req.body;

		if (!name || !price || !category_id) {
			return res.status(400).json(jsonResponseHelper({
				flag: 'error',
				message: 'Invalid fields',
				error: [
						!name && "Product name is required",
						!price && "Product price is required",
						!category_id && "Category is required"
					].filter(Boolean),
			}));
		}

		const category = await Category.findById(category_id).exec();
		if (!category) {
			return res.status(400).json(jsonResponseHelper({
				flag: 'error',
				message: 'Invalid fields',
				error: 'Category is invalid',
			}));
		}

		const product = new Product({ name, price, category, ...rest });
		const productResponse = await product.save();

		return res.status(200)
			.json(jsonResponseHelper({
				message: 'Product created',
				data: productResponse
			}))
	} catch (err) {
		if (err.name === "ValidationError") {
      		const messages  = Object.values(err.errors).map(val => val.message);
      		return res.status(400)
				.json(jsonResponseHelper({
					flag: "error",
					message: 'Invalid fields',
					error: messages
				}))
    	}

		return res
			.status(500)
			.json(jsonResponseHelper({
				flag: "error",
				message: 'An error occured',
				data: err.message
			}))
	}
}

// @desc	Show product
// @route	GET /api/products/:id
exports.showProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id).exec();

		if (!product) {
			return res.status(404)
				.json(jsonResponseHelper({
					flag: 'error',
					message: 'Category does not exist',
				}))
		}

		return res.status(200)
			.json(jsonResponseHelper({
				message: 'Product details',
				data: product
			}))
	} catch (err) {
		return res.status(500)
			.json(jsonResponseHelper({
				flag: "error",
				message: 'An error occured',
			}))
	}
}

// @desc	Update product by id
// @route	PUT /api/products/:id
exports.updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, price, category_id, ...rest } = req.body;

		if (!name || !price || !category_id) {
			return res.status(400).json(jsonResponseHelper({
				flag: 'error',
				message: 'Invalid fields',
				error: [
						!name && "Product name is required",
						!price && "Product price is required",
						!category_id && "Category is required"
					].filter(Boolean),
			}));
		}

		const category = await Category.findById(category_id).exec();
		if (!category) {
			return res.status(400).json(jsonResponseHelper({
				flag: 'error',
				message: 'Invalid fields',
				error: 'Category is invalid',
			}));
		}

		const product = await Product.findByIdAndUpdate(
			id,
			{ name, price, category, ...rest},
			{
				new: true,           
				runValidators: true,
			}
		);

		if (!product) {
			return res.status(404).json(jsonResponseHelper({
				flag: "error",
				message: 'Product not found'
			}));
		}

		return res.status(200)
			.json(jsonResponseHelper({
				message: 'Product updated',
				data: product
			}))
	} catch (err) {
		console.log(err)
		return res.status(500)
			.json(jsonResponseHelper({
				flag: "error",
				message: 'An error occured',
			}))
	}
}

// @desc	Delete product by id
// @route	DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		await Product.findByIdAndDelete(id)

		return res.status(200)
			.json(jsonResponseHelper({
				message: 'Product deleted',
			}))
	} catch (err) {
		return res.status(500)
			.json(jsonResponseHelper({
				flag: "error",
				message: 'An error occured',
			}))
	}
}