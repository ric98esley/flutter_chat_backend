/* 
        path: api/login
*/

const { Router} = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controller/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validatorField } = require('../middlewares/validator-fields');


const router = Router();

router.post('/new',
[
	check('name', 'El nombre es obligatorio y con minimo 2 letras').not().isEmpty().isLength({min: 2}),
	check('email', 'El email tiene que ser email').isEmail(),
	check('password', 'El password es obligatorio y minimo 6 caracteres').isLength({min : 6}), validatorField
]
,crearUsuario);

router.post('/',
	[
		check('email', 'El email tiene que ser un correo').isEmail(),
		check('password', 'El Password es obligatorio').isLength({min:6})
		,validatorField
	]
	,login)

router.get('/renew', validarJWT, renewToken)

module.exports =  router;