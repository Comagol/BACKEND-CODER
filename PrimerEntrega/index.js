const ProductManager = require ('./productManager');
const CartManager = require('./cartManager');
const { title } = require('process');

const productManager = new ProductManager();
const cartManager = new CartManager();

productManager.addProduct({
    title : "Computadora",
    description : "Laptop de ultima generacion con detalles gamer",
    code : "COMP10",
    price : 1500,
    status : true,
    category : "Tecnologia",
    thumbnails : ["img/computadora1.jpg"]
}) 

productManager.addProduct({
    title : "Celular",
    description : "samsung galaxy a23",
    code : "SAM23",
    price : 600,
    status : true,
    category : "Electronica",
    thumbnails : ["img/celular1.jpg"]
}) 

console.log("Productos: ", productManager.getProduct());

productManager.updateProduct(1, { price: 1600});

console.log("Producto actualizado: ", productManager.getProductById(1));

const nuevoCarrito = cartManager.createCart();
console.log("Carrito creado:", nuevoCarrito);

cartManager.addProductToCart(nuevoCarrito.id,1);
cartManager.addProductToCart(nuevoCarrito.id,2);
cartManager.addProductToCart(nuevoCarrito.id,1);

console.log("Carrito de compras actualizada: ", cartManager.getCartById(nuevoCarrito.id));