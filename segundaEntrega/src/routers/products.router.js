// products.router.js

const express = require('express');
const ProductManager = require('../managers/ProductManager');
const path = require('path');

const productManager = new ProductManager(path.join(__dirname, '../products.json'));

function getProductsRouter(io) {
    const router = express.Router();

    router.get('/', async (req, res) => {
        const products = await productManager.getProducts();
        res.json(products);
    });

    router.get('/:pid', async (req, res) => {
        const id = Number(req.params.pid);
        const product = await productManager.getProductById(id);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    });

    router.post('/', async (req, res) => {
        const { title, description, price, thumbnail, code, stock, category } = req.body;

        if (!title || !description || !price || !code || !stock || !category) {
            return res.status(400).json({ error: 'todos los campos son obligatorios' });
        }

        const newProduct = await productManager.addProduct({
            title,
            description,
            price,
            thumbnail: thumbnail || '',
            code,
            stock,
            category,
            status: true,
        });

        const products = await productManager.getProducts();
        io.emit('productsUpdated', products); // Emitir al frontend

        res.status(201).json(newProduct);
    });

    router.put('/:pid', async (req, res) => {
        const id = Number(req.params.pid);
        const dataToUpdate = req.body;

        if (dataToUpdate.id) {
            return res.status(400).json({ error: 'No se puede modificar el ID de un producto.' });
        }

        const updated = await productManager.updateProduct(id, dataToUpdate);

        if (!updated) {
            return res.status(404).json({ error: 'Producto no encontrado para actualizar.' });
        }

        res.json(updated);
    });

    router.delete('/:pid', async (req, res) => {
        const id = Number(req.params.pid);
        const deleted = await productManager.deleteProduct(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const products = await productManager.getProducts();
        io.emit('productsUpdated', products);

        res.json({ message: 'Producto eliminado con éxito.' });
    });

    return router;
}

module.exports = getProductsRouter;
