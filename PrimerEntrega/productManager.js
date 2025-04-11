const fs = require('fs');
const path = require('path');

const pathProductos = path.join(__dirname, 'products.json');

if(!fs.existsSync(pathProductos)) {
    fs.writeFileSync(pathProductos, '[]');
}

class ProductManager {
    constructor() {
        this.path = pathProductos;
    }

    getProduct() {
        const data = fs.readFileSync(this.path, 'utf-8');
        return JSON.parse(data);
    }

    getProductById (pid) {
        const products = this.getProduct();
        return products.find(product => product.id === pid);
    }

    addProduct(product) {
        const products = this.getProduct();
        product.id = products.length > 0 ? products[products.length -1].id + 1 : 1;
        products.push(product);
        fs.writeFileSync(this.path, JSON.stringify(products,null,2));
    } 

    updateProduct(pid, updateFields) {
        const products = this.getProduct();
        const index = products.findIndex(product => product.id === pid);
        if(index === -1) return false;
        products[index] = { ...products[index], ...updateFields, id: pid};
        fs.writeFileSync(this.path, JSON.stringify(products,null,2));
        return true;
    }

    deleteProduct(pid) {
        let products = this.getProduct();
        products = products.filter(product => product.id !== pid);
        fs.writeFileSync(this.path, JSON.stringify(products,null,2));
    }

}

module.exports = ProductManager;