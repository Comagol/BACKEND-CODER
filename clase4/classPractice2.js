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


function addProduct(product) {
    const products = getProducts();
    products.push(product);
    fs.writeFileSync(pathProductos, JSON.stringify(products))
}

const productos = getProducts();

const newProduct = {
    id: 6,
    title: "Computadora nueva",
    description: "Descripcion de la computadora nueva",
    code: "LASN568",
    price: 6800,
    status: true,
    stock: 5,
    category: "Tecnologia",
    thumbnails: ["img/laptop1.jpg","img/laptop3.jpg"]
}

console.log(productos);
console.log('Producto ID:3', getProductById(3));

addProduct(newProduct);
console.log(productos);