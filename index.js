const express = require('express');
const path = require('path');
require('dotenv').config();

// Db config 
const { dbConnetion } = require('./database/config');
dbConnetion();

// App de express
const app = express();

// lectura y parseo del Body

app.use(express.json());


//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


// Path publico

const publicPath = path.resolve( __dirname, 'public');
app.use( express.static(publicPath));

// Mis rutas

app.use('/api/login', require('./routes/auth'))
app.use('/api/users', require('./routes/user'))
app.use('/api/messages', require('./routes/messages'))


server.listen(process.env.PORT, (err )=>{
    if (err) throw new Error(err);
    console.log("Servidor corriendo en puerto", process.env.PORT);
});