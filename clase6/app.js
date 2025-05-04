const express = require('express');
const http = require('https').createServer(app);
const io = require(socket.io)(http)

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, '/public')));

let messages = [];

//configuracion Socket.io
io.on('connection', (socket) => {
    socket.emit("messageList", messages);
    console.log("Nuevo cliente se ha conectado");

    socket.on('newMessage', (message) => {
        messages.push(message);
        io.emit('newMessage', {
            socketId : socket.id, message: message
        })
    })
})


app.listen(PORT, () => {
    console.log(`Server runing in port ${PORT}`);
});