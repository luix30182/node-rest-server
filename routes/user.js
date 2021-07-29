const { Router } = require('express');
const { check } = require('express-validator');
const {
	getUsers,
	putUsers,
	postUsers,
	deleteUsers,
	patchUsers,
} = require('../controllers/users');
const {
	isRoleValid,
	emailExist,
	existUserId,
} = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');
const router = Router();

router.get('/', getUsers);
router.put(
	'/:id',
	[
		check('id', 'Invalid Id').isMongoId(),
		check('id').custom(existUserId),
		check('role').custom(isRoleValid),
		validateFields,
	],
	putUsers
);
router.patch('/', patchUsers);
router.post(
	'/',
	[
		check('email', 'Invalid email').isEmail(),
		check('email').custom(emailExist),
		check(
			'password',
			'Required email must be at least 6 characters length'
		).isLength({ min: 6 }),
		check('name', 'Name is required').not().isEmpty(),
		check('role').custom(isRoleValid),
		validateFields,
	],
	postUsers
);
router.delete('/', deleteUsers);

module.exports = router;
