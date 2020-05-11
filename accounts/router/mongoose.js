const mongoose = require('mongoose');
const config = require('../config');

module.exports = async () => {
	await mongoose.connect(config.MONGO_CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
};
