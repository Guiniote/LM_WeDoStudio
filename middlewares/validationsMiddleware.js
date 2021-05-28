const path = require('path');
const { body } = require('express-validator');

const validateRegister = [
	body('firstName').notEmpty().withMessage('Recordá ingresar un nombre'),
    body('lastName').notEmpty().withMessage('Recordá ingresar un un apellido'),
	body('email').notEmpty().withMessage('Recordá ingresar un email').bail().isEmail().withMessage('El email tiene que tener un formato válido'),
	body('password').notEmpty().withMessage('Recordá ingresar una contraseña'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			throw new Error('El campo de imagen es obligatorio');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
];

const validateEditProduct = [
	body('name').notEmpty().withMessage('Recordá ingresar un nombre'),
    body('description').notEmpty().withMessage('Recordá ingresar un un apellido'),
	body('category').notEmpty().withMessage('Recordá ingresar un email').bail().isEmail().withMessage('El email tiene que tener un formato válido'),
	body('colors').notEmpty().withMessage('Recordá ingresar una contraseña'),
	body('price').notEmpty().withMessage('Recordá ingresar una contraseña')
]



module.exports = {validateRegister, validateEditProduct}
	