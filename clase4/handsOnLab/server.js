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
app.get('/products/:pid', (req,res) =>{
    const {pid} = req.params;
    const product = productManager.getProductById(pid);
    if (!product) {
        return res.status(404).json({mensaje: 'Producto no encontrado'});
    }
    res.json(product);
});

app.post('/products', (req,res) => {
    const {title, description, price, thumbnail, code, stock} = req.body;

    //validacion basica para que los campos esten completos
    if(!title || !description || !price || !thumbnail || !code || !stock) {
        return res.status(400).json({mensaje: 'Faltan campos obligatorios.'});
    }

    const nuevoProducto = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    };

    const productoAgregado = productManager.addProduct(nuevoProducto);
    res.status(201).json({mensaje: 'producto agregado', producto: productoAgregado });
});

//inicio del servidor
app.listen(PORT, () =>{
    console.log(`Servidor levantado y corriendo en el puerto${PORT}`)
});