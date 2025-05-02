const express = require('express');
const ProductManager = require('../managers/ProductManager');
const path = require('path');

const router = express.Router();

// Ruta del json donde voy a guardar los productos
const productManager = new ProductManager(path.join(__dirname, '../products.json'));

// Creo el GET /api/products => para devovler podos los productos
router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

// Creo el GET /api/products/:pid => para obtener un producto por id
router.get('/:pid', async (req, res) => {
    const id = Number(req.params.pid);
    const product = await productManager.getProductById(id);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado'});
    }
    res.json(product);
});

// POST /api/products => para cargar un nuevo producto
router.post('/', async (req, res) => {
    const {title, description, price, thumbnail, code, stock, category} = req.body;

    if(!title || !description || !price || !code || !stock || !category) {
        return res.status(400).json({ error: 'todos los campos son obligatorios'});
    }

    const newProduct = await productManager.addProduct({
        title,
        description,
        price,
        thumbnail: thumbnail ||'',
        code,
        stock,
        category,
        status: true,
    });

    res.status(201).json(newProduct);
});


// PUT /api/products/:pid metodo para actualizar los datos de un producto, salvo su id
router.put('/:pid', async(req, res) => {
    const id = Number(req.params.pid);
    const dataToUpdate = req.body;

    if (dataToUpdate.id) {
        return res.status(400).json({error: 'No se puede modificar el ID de un producto.'});
    }

    const updated = await productManager.updateProduct(id, dataToUpdate);

    if(!updated) {
        return res.status(404).json({ error: 'producto no encontrado para actualizar.'});
    }

    res.json(updated);
});

// DELETE /api/products/pid => metodo para eliminar un prodicdo por ID
router.delete('/:pid', async (req, res) => {
    const id = Number(req.params.pid);
    const deleted = await productManager.deleteProduct(id);

    if(!deleted) {
        return res.status(404).json({ error: 'Producto no encontrado'})
    }

    res.json({ message: 'Producto eliminado con exito.'})
});

module.exports = router;
