// importo los modulos necesarios
const express = require('express');
const ProductManager = require('./productManager')

//Creo la app express y defino el puerto
const app = express();
const PORT = 3000;

//middleware para poder leet JSON desde el body de las peticiones
app.use(express.json());

//Instancio el ProductManager
const productManager = new ProductManager();

//Endpoint para obtener los productos
app.get('/products', (req,res) =>{
    const products = productManager.getProducts();
    res.json({ productos: products});
});

//Endpoint para obtener un producto por id
app.post('products/:pid', (req,res) =>{
    const {pid} = req.params;
    const product = productManager.getProductById(pid);
    if (!product) {
        return res.status(404).json({mensaje: 'Producto no encontrado'});
    }
    res.json(product);
});

//inicio del servidor
app.listen(PORT, () =>{
    console.log(`Servidor levantado y corriendo en el puerto${PORT}`)
})