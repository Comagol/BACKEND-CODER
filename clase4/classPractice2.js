const fs = require('fs');
const path = require('path');

const pathProductos = path.join(__dirname, 'productos.json');

const productos = fs.readFileSync(pathProductos, 'utf-8');

console.log(productos);