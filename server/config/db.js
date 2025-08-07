const mongoose = require('mongoose');

const connectDB = async () => {
	await mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Connected to database')
	})
	.catch((error) => {
		console.log('Connected failed!')
		console.error(error)
	})
}

module.exports = connectDB;