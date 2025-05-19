// products.router.js

const express = require('express');
const Product = require('../models/Product');

function getProductsRouter(io) {
    const router = express.Router();

    // GET /api/products con paginación y filtros
    router.get('/', async (req, res) => {
        try {
            const { limit = 10, page = 1, sort, query } = req.query;
            const options = {
                limit: parseInt(limit),
                page: parseInt(page),
                lean: true
            };

            // Configurar el filtro
            const filter = {};
            if (query) {
                if (query === 'available') {
                    filter.status = true;
                } else {
                    filter.category = query;
                }
            }

            // Configurar el ordenamiento
            if (sort) {
                options.sort = { price: sort === 'asc' ? 1 : -1 };
            }

            const result = await Product.paginate(filter, options);

            // Construir los links de paginación
            const baseUrl = `${req.protocol}://${req.get('host')}${req.path}`;
            const prevLink = result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null;
            const nextLink = result.hasNextPage ? `${baseUrl}?page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null;

            res.json({
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
            res.status(500).json({ status: 'error', message: error.message });
        }
    });

    // GET /api/products/:pid
    router.get('/:pid', async (req, res) => {
        try {
            const product = await Product.findById(req.params.pid);
            if (!product) {
                return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
            }
            res.json({ status: 'success', payload: product });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    });

    // POST /api/products
    router.post('/', async (req, res) => {
        try {
            const newProduct = await Product.create(req.body);
            io.emit('productCreated', newProduct);
            res.status(201).json({ status: 'success', payload: newProduct });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    });

    // PUT /api/products/:pid
    router.put('/:pid', async (req, res) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.pid,
                req.body,
                { new: true }
            );
            if (!updatedProduct) {
                return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
            }
            io.emit('productUpdated', updatedProduct);
            res.json({ status: 'success', payload: updatedProduct });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    });

    // DELETE /api/products/:pid
    router.delete('/:pid', async (req, res) => {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.pid);
            if (!deletedProduct) {
                return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
            }
            io.emit('productDeleted', req.params.pid);
            res.json({ status: 'success', message: 'Producto eliminado' });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    });

    return router;
}

module.exports = getProductsRouter;
