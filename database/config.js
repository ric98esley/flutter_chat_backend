const mongoose = require('mongoose');

const dbConnetion = async() => {
    try {
        mongoose.connect(process.env.DB_CNN);
        console.log('db online')
    } catch (error) {
        console(error);
        throw new Error('Error, hable con el administrador')
    }
}


module.exports = { dbConnetion}