/*
    Path: /api/messages
*/

const { Router} = require('express');
const { getChat } = require('../controller/messages');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get('/:from', validarJWT , getChat)

module.exports =  router;