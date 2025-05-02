// Modulos Principales de la app
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const exphbs = require('expres-handlebars');

// Routers
const productsRouter = require('./routers/products.router');
const cartsRouter = require('./routers/carts.router');
const viewsRouter = require('./routers/views.router');
const { Socket } = require('dgram');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, '../public')));

// Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// WebSocket
io.on('connection', socket => {
    console.log('🧙‍♂️ cliente conecta por Socket.io');

    //aca va se van a manejar los eventos en tiempo real

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

module.exports = { io };

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto${PORT}`);
});


