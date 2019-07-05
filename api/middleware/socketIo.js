const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

 const users = {};

module.exports = (user, gameId) => {
    console.log('in socket');
    io.sockets.on("connection",  (socket) => {
        users[socket.id] = user;

        socket.on(gameId, (room) => {
            socket.join(room);
        });

        socket.on("new message", (data) => {
            io.sockets.in(gameId).emit('game news', users[socket.id] + ': '+ data);
        })

    });
}