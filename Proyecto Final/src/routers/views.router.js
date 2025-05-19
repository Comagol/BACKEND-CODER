const express = require('express');
const path = require('path');
const router = express.Router();
const Product = require('../models/Product');
const Cart = require('../models/Cart');

// la ruta home va a mostrar todos los productos actuales
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.render('home', { products });
    } catch (error) {
        res.status(500).send('Error al cargar los productos');
    }
});

// La ruta realtimeproducts es la vista dinámica con websocket
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// Vista principal de productos
router.get('/products', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            lean: true
        };

        const filter = {};
        if (query) {
            if (query === 'available') {
                filter.status = true;
            } else {
                filter.category = query;
            }
        }

        if (sort) {
            options.sort = { price: sort === 'asc' ? 1 : -1 };
        }

        const result = await Product.paginate(filter, options);

        // Construir los links de paginación
        const baseUrl = `${req.protocol}://${req.get('host')}${req.path}`;
        const prevLink = result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null;
        const nextLink = result.hasNextPage ? `${baseUrl}?page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null;

        // Obtener o crear un carrito para el usuario
        let cart = await Cart.findOne();
        if (!cart) {
            cart = await Cart.create({ products: [] });
        }

        res.render('products', {
            ...result,
            prevLink,
            nextLink,
            cartId: cart._id
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).render('error', { message: 'Error al cargar los productos' });
    }
});

// Vista de detalle de producto
router.get('/products/:pid', async (req, res) => {
    try {
        const product = await Product.findById(req.params.pid);
        if (!product) {
            return res.status(404).render('error', { message: 'Producto no encontrado' });
        }

        // Obtener o crear un carrito para el usuario
        let cart = await Cart.findOne();
        if (!cart) {
            cart = await Cart.create({ products: [] });
        }

        res.render('product-detail', {
            product,
            cartId: cart._id
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).render('error', { message: 'Error al cargar el producto' });
    }
});

// Vista del carrito
router.get('/carts/:cid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product');
        if (!cart) {
            return res.status(404).render('error', { message: 'Carrito no encontrado' });
        }

        // Calcular el total
        const total = cart.products.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity);
        }, 0);

        res.render('cart', {
            ...cart.toObject(),
            total
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).render('error', { message: 'Error al cargar el carrito' });
    }
});

// Vista de error
router.get('/error', (req, res) => {
    res.render('error', { message: 'Ha ocurrido un error' });
});

module.exports = router;