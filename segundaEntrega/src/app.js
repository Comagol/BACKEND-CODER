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

//importo el productmanager para leer los productos actualizados
const ProductManager = require('./managers/ProductManager');
const productManager = new ProductManager(path.join(__dirname, 'products.json'));

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// WebSocket
io.on('connection', async (socket) => {
    console.log('🧙‍♂️ Cliente conectado por Socket.io');

    // Cuando se conecta un cliente, le enviamos los productos actuales
    const products = await productManager.getProducts();
    socket.emit('productsUpdated', products);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Hacemos accesible el io en otros archivos
app.set('io', io);


const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto${PORT}`);
});


