const Category = require('../models/category.model');
const { jsonResponseHelper } = require('../utils/Helper');

// @desc	List all categories
// @route	GET /api/categories
exports.getCategories = async (req, res) => {
	try {
		const categories = await Category.find();

		return res.status(200)
			.json(jsonResponseHelper({
				message: 'List of all categories',
				data: categories
			}))
	} catch (err) {
		return res.status(500)
			.json(jsonResponseHelper({
				flag: "error",
				message: 'An error occured',
			}))
	}
}

// @desc	Create categories
// @route	POST /api/categories
exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;

		const category = new Category({ name, description });
		const categoryResponse = await category.save();

		return res.status(200)
			.json(jsonResponseHelper({
				message: 'Category created',
				data: categoryResponse
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

		return res.status(500)
			.json(jsonResponseHelper({
				flag: "error",
				message: 'An error occured',
			}))
	}
}

// @desc	Show category
// @route	GET /api/categories/:id
exports.showCategory = async (req, res) => {
	try {
		const { id } = req.params;
		const category = await Category.findById(id).exec();

		return res.status(200)
			.json(jsonResponseHelper({
				message: 'Category details',
				data: category
			}))
	} catch (err) {
		return res.status(500)
			.json(jsonResponseHelper({
				flag: "error",
				message: 'An error occured',
			}))
	}
}

// @desc	Update category by id
// @route	PUT /api/categories/:id
exports.updateCategory = async (req, res) => {
	try {
		const category = await Category.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,           
				runValidators: true,
			}
    	);

		if (!category) {
			return res.status(404).json(jsonResponseHelper({
				flag: "error",
				message: 'Category not found'
			}));
		}

		return res.status(200)
			.json(jsonResponseHelper({
				message: 'Category updated',
				data: category
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
		
		return res.status(500)
			.json(jsonResponseHelper({
				flag: "error",
				message: 'An error occured',
			}))
	}
}

// @desc	Delete category by id
// @route	DELETE /api/categories/:id
exports.deleteCategory = async (req, res) => {
	try {
		const { id } = req.params;
		await Category.findByIdAndDelete(id)

		return res.status(200)
			.json(jsonResponseHelper({
				message: 'Category deleted',
			}))
	} catch (err) {
		return res.status(500)
			.json(jsonResponseHelper({
				flag: "error",
				message: 'An error occured',
			}))
	}
}