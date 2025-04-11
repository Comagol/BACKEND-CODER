const fs = require('fs');
const { get } = require('http');
const path = require('path');

const pathProductos = path.join(__dirname, 'productos.json');

function getProducts() {
    const productos = fs.readFileSync(pathProductos, 'utf-8');
    return JSON.parse(productos);
}

function getProductById(pId) {
    const products = getProducts();
    return products.find(producto => producto.id === pId);
}

const productos = getProducts();

console.log(productos);
console.log('Producto ID:3', getProductById(3))