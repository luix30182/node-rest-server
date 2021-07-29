const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUsers = async (req, res = response) => {
	const { limit = 5, from = 0 } = req.query;

	const [users, total] = await Promise.all([
		User.find({ status: true }).limit(parseInt(limit)).skip(parseInt(from)),
		User.countDocuments({ status: true }),
	]);

	res.json({
		total,
		users,
	});
};

const postUsers = async (req, res) => {
	const { name, password, email, role } = req.body;
	const user = new User({ name, password, email, role });

	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync(password, salt);

	await user.save();
	res.json({
		user,
	});
};

const putUsers = async (req, res) => {
	const id = req.params.id;
	const { _id, password, google, email, ...rest } = req.body;

	if (password) {
		const salt = bcryptjs.genSaltSync();
		rest.password = bcryptjs.hashSync(password, salt);
	}

	const user = await User.findByIdAndUpdate(id, rest);

	res.json(user);
};

const patchUsers = (req, res) => {
	res.json({
		ok: true,
		msg: 'patch api controller',
	});
};

const deleteUsers = (req, res) => {
	res.json({
		ok: true,
		msg: 'delete api controller',
	});
};

module.exports = {
	getUsers,
	postUsers,
	putUsers,
	patchUsers,
	deleteUsers,
};
