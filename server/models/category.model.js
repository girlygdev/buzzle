const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Category name is required'],
		trim: true
	},
	description: {
		type: String,
		default: ''
	}
});

module.exports = mongoose.model('Category', CategorySchema);
