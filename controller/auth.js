const { response } = require('express');
const bcrypt = require('bcryptjs')

const User = require('../models/user');
const { generatorJWT } = require('../helpers/jwt');
const { findOne } = require('../models/user');

const crearUsuario = async (req, res = response ) => {

    const { email, password } = req.body;
    try {
        const existeEmail = await User.findOne({email});
        if( existeEmail ){
            return res.status(400).json({
                ok:false,
                msg: "El correo ya esta registrado"
            })
        }

        // Encriptar contrasena
        const usuario = new User(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        await usuario.save();
        // generar mi JWT
        const token = await generatorJWT(usuario.id);


        res.json({
            ok: true,
            usuario,
            token,
            msg: 'Usuario Creado!!'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }


}

const login = async (req, res = response) =>{
    const { email, password } = req.body;
    try {
        const usuarioDB = await User.findOne({email});
        if(!usuarioDB) {
            return res.status(404).json({
                'ok':  false,
                'msg': "Email no registrado"
            })
        
        }
        const validPassword = bcrypt.compareSync(password, usuarioDB.password)
        if(!validPassword){
            return res.status(400).json({
                'ok': false,
                'msg': "contrasena incorrecta"
            })
        }

        const token = await generatorJWT(usuarioDB.id);
        res.json({
            ok: true,
            msg: 'Login',
            token,
            usuario: usuarioDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

}
const renewToken = async (req, res = response) => {
    const uid = req.uid;
    const token = await generatorJWT(uid);
    const user = await User.findById(uid);
    res.json({
        ok: true,
        user: user,
        token
    })
}


module.exports = { crearUsuario, login, renewToken };