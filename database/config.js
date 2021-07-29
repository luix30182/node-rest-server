const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_ATLAS, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		console.log('Connected to db');
	} catch (e) {
		console.error(e);
		throw new Error('Error in init database');
	}
};

module.exports = {
	dbConnection,
};
