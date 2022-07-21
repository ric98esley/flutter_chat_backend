/* 
        path: api/users
*/

const { Router} = require('express');
const { getUsers } = require('../controller/users');

const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get('/', validarJWT , getUsers)

module.exports =  router;