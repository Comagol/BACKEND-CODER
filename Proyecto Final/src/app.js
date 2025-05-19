// app.js

require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const hbs = require('./config/handlebars.config');
const connectDB = require('./config/db.config');
const Product = require('./models/Product');

// Importo routers como funciones
const getProductsRouter = require('./routers/products.router');
const cartsRouter = require('./routers/carts.router');
const viewsRouter = require('./routers/views.router');

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

    // Manejar la solicitud de productos con filtros y paginación
    socket.on('getProducts', async (params) => {
        try {
            const { page = 1, limit = 10, sort, category } = params;
            const options = {
                limit: parseInt(limit),
                page: parseInt(page),
                lean: true
            };

            // Configurar el filtro
            const filter = {};
            if (category) {
                filter.category = category;
            }

            // Configurar el ordenamiento
            if (sort) {
                options.sort = { price: sort === 'asc' ? 1 : -1 };
            }

            const result = await Product.paginate(filter, options);

            // Construir los links de paginación
            const baseUrl = '/api/products';
            const prevLink = result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${category ? `&category=${category}` : ''}` : null;
            const nextLink = result.hasNextPage ? `${baseUrl}?page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${category ? `&category=${category}` : ''}` : null;

            socket.emit('productsUpdated', {
                status: 'success',
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink,
                nextLink
            });
        } catch (error) {
            console.error('Error:', error);
            socket.emit('productsUpdated', {
                status: 'error',
                message: error.message
            });
        }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});