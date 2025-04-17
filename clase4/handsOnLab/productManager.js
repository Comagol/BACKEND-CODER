//importo los modulos necesarios
const path = require('path');
const fs = require('fs');

//defino la ruta para los productos
const pathProductos = path.join(__dirname, 'products.json');

//no se como definir una ruta para los archivos
if(!fs.existsSync(pathProductos)) {
    fs.writeFileSync(pathProductos ,'[]');
}

//Creo la clase para luego exportar sus metodos 
class ProductManager {
    constructor() {
        this.path = pathProductos;
    }

    //Metodo para obtener todos los productos
    getProducts() {
        const data = fs.readFileSync(this.path,'utf-8');
        return JSON.parse(data);
    }

    //metodo para agregar productos
    addProduct(product) {
        const products = this.getProducts();
        product.id = products.length > 0 ? products[products.length -1].id + 1 : 1;
        products.push(product);
        fs.writeFileSync(this.path, JSON.stringify(products,null,2));
        return product;
    }

    //metodo para obtener un producto por ID
    getProductById(pid) {
        const products = this.getProducts();
        return products.find(product => product.id === parseInt(pid));
    }

}

module.exports = ProductManager;