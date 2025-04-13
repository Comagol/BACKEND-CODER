// importo con require los modulos necesarios.
const fs = require('fs');
const path = require('path');

// Defino la ruta de products.json
const pathProductos = path.join(__dirname, 'products.json');

// me aseguro que si no existe el archivo lo cree con writefilesync con un array vacio.
if(!fs.existsSync(pathProductos)) {
    fs.writeFileSync(pathProductos, '[]');
}

// Creo la clase ProductManager para luego exportar todos los metodos de la clase dentro.
class ProductManager {
    constructor() {
        this.path = pathProductos;
    }

    // Metodo para obtener todos los productos.
    getProduct() {
        const data = fs.readFileSync(this.path, 'utf-8');
        return JSON.parse(data);
    }

    // Metodo para obtener un producto en particular por ID.
    getProductById (pid) {
        const products = this.getProduct();
        return products.find(product => product.id === pid);
    }

    // Metodo para agregar un nuevo producto con la logica para que el id sea autoincrementable. y lo agregamos con writefilesync a this.path que nos lleva a products.json donde lo reescribimos por completo.
    addProduct(product) {
        const products = this.getProduct();
        product.id = products.length > 0 ? products[products.length -1].id + 1 : 1;
        products.push(product);
        fs.writeFileSync(this.path, JSON.stringify(products,null,2));
    } 

    // Metodo para modificar el valor de un campo de un producto en especifico por su id y pasando la clave del campo a modificar y su nuevo valor. donde validamos que el id del producto exista sino devolvemos false y salimos de esa ejecucion, y sino lo modificamos con fs.writefilestnc con el path que nos lleva a products.json usando la funcion stringify(products,null,2). la ultima parte del null y el 2 es para que cuando se escriba el archivo sea mas facil de leer.
    updateProduct(pid, updateFields) {
        const products = this.getProduct();
        const index = products.findIndex(product => product.id === pid);
        if(index === -1) return false;
        products[index] = { ...products[index], ...updateFields, id: pid};
        fs.writeFileSync(this.path, JSON.stringify(products,null,2));
        return true;
    }

    // Metodo para eliminar un producto por id. Usamos el filter para filtrar el producto por el ID pasado por parametro. Reescribimos los products devolviendo el objeto sin el producto si asi corresponde.
    deleteProduct(pid) {
        let products = this.getProduct();
        products = products.filter(product => product.id !== pid);
        fs.writeFileSync(this.path, JSON.stringify(products,null,2));
    }

}

// Exporto la clase ProductManager usando module.exports
module.exports = ProductManager;