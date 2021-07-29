const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') => {
	const existRole = await Role.findOne({ role });
	if (!existRole) {
		throw new Error(`The role ${rol} is not valid`);
	}
};

const emailExist = async (email) => {
	const emailExist = await User.findOne({ email });
	if (emailExist) {
		throw new Error(`Email: ${email} already exist`);
	}
};

const existUserId = async (id) => {
	let idExist = null;
	try {
		idExist = await User.findById(id);
		console.log(idExist);
	} catch (e) {
		throw new Error(`The user Id: ${id} does not exist`);
	}
	if (!idExist) {
		throw new Error(`The user Id: ${id} does not exist`);
	}
};

module.exports = {
	isRoleValid,
	emailExist,
	existUserId,
};
