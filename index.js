//Node server to handle socket connections
const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
    }
});
const users = {};

//instance to listen the various connections
io.on('connection', socket => {
    //instance to handle the events inside the specific connection
    socket.on('new-user-joined', name => {
        //whenever a new user joins the chat, a broadcast notification is sent to others about the user's name 
        users[socket.id] = name; //assign name to the user id
        socket.broadcast.emit('user-joined', name);
    })
    socket.on('send', message => {
        socket.broadcast.emit('recieve', { message: message, name: users[socket.id] })
    })

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    })
})