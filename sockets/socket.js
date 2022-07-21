const { io  }= require('../index')
const { checkJWT } = require('../helpers/jwt');
const { connectedUser, disconnectedUser, recordMessage} = require('../controller/socket');
// Mensaje de Sockets
io.on('connection', client => {

    console.log('Cliente conectado');
    const [ valido, uid] = checkJWT(client.handshake.headers['x-token']);

    // Verificar usuario autenticado
    if(!valido) return client.disconnect();

    // Usuario autenticado con el token
    connectedUser(uid);
    // Ingresar al usuario a una sala en particular

    // sala global, client.id, uid de moongodose
    client.join (uid);
    client.on('private-message',async (payload) =>{
        console.log(payload);
        await recordMessage(payload);
        io.to(payload.to).emit('private-message', payload )
    })

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        disconnectedUser(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log(payload);
    //     io.emit('mensaje', {admin: 'Nuevo Mensaje'})
    // })
  });
