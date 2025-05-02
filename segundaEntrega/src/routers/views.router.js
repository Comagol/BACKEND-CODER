const express = require('express');
const path = require('path');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

//uso la ruta del archivo products.json
const productManager = new ProductManager(
    path.join(__dirname, '../products.json')
);

// la ruta home va a mostrar todos los productos actuales
router.get('/home', async (req, res) => {
    try{
        const products = await productManager.getProducts();
        res.render('home', {products});
    } catch (error) {
        res.status(500).send('Error al cargar los productos');
    }
});

// La ruta realtimeproducts es la visat dinamica con websocket
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

module.exports = router;