// app.js

require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const hbs = require('./config/handlebars.config');
const connectDB = require('./config/db.config');

// Importo routers como funciones
const getProductsRouter = require('./routers/products.router');
const cartsRouter = require('./routers/carts.router');
const viewsRouter = require('./routers/views.router');

const ProductManager = require('./managers/ProductManager');
const productManager = new ProductManager(path.join(__dirname, 'products.json'));

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// 💡 Acá pasás `io` al router de productos
app.use('/api/products', getProductsRouter(io));
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// WebSocket
io.on('connection', async (socket) => {
    console.log('🧙‍♂️ Cliente conectado por Socket.io');
    const products = await productManager.getProducts();
    socket.emit('productsUpdated', products);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});