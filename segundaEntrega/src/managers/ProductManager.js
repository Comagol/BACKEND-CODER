const fs = require('fs').promises;

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async getProducts () {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getProductById (id) {
        const products = await this.getProducts();
        return products.find(p => p.id === id);
    }

    async addProduct (product) {
        const products = await this.getProducts();
        const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const newProduct = {
            id: newId,
            ...product,
        };

        products.push(newProduct)
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }


    async updateProduct(id, updatedFields) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return null;

        products[index] = { ...products[index], ...updatedFields, id };
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const filtered = products.filter(p => p.id !== id);

        if (products.length === filtered.length) return false;

        await fs.writeFile(this.path, JSON.stringify(filtered,null, 2));
        return true;
    }
}

module.exports = ProductManager;