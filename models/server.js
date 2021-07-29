const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.usersPath = '/api/users';

		this.connectToDb();

		this.middlewares();

		this.routes();
	}

	async connectToDb() {
		await dbConnection();
	}

	middlewares() {
		// cors
		this.app.use(cors());
		//public directory
		this.app.use(express.static('public'));
		//JSON response
		this.app.use(express.json());
	}

	routes() {
		this.app.use(this.usersPath, require('../routes/user'));
	}

	listen() {
		this.app.listen(this.port);
	}
}

module.exports = Server;
