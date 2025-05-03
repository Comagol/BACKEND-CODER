const express = require('express');
const CartManager = require('../managers/CartManager');
const path = require('path');

const router = express.Router();

const cartManager = new CartManager(path.join(__dirname, '../carts.json'));

// POST => para crear un nuevo carrito
router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
});

// GET => obtengo unn carrito por id
router.get('/:cid', async (req, res) => {
    const cartId = Number(req.params.cid);
    const cart = await cartManager.getCartById(cartId)

    if(!cart) {
        return res.status(404).json({error: 'carrito no encontrado.'});
    }

    res.json(cart);
});

// POST /api/carts/:cid/product/:pid => medienate esa ruta agrego un producto al carrito
router.post('/:cid/product/:pid' , async (req, res) => {
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);

    const updatedCart = await cartManager.addProductToCart(cartId, productId);

    if (!updatedCart) {
        return res.status(404).json({ error: 'Carrito o producto con encontrado.'});
    }

    res.json(updatedCart);
});

module.exports = router;