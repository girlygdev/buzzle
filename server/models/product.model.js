const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
	name: {
		type: String,
		requried: [true, 'Product name is required'],
		trim: true
	},
	price: {
		type: Number,
		required: [true, 'Product price is required'],
		min: 0
	},
	description: {
		type: String,
		default: ''
	},
	inStock: {
		type: Boolean,
		default: true
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: [true, 'Category is required']
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Product', ProductSchema);
