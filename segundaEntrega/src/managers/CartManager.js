const fs = require('fs').promises;

class CartManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async getCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === id);
    }

    async addCart() {
        const carts = await this.getCarts();
        const newId = carts.length > 0 ? carts[carts.length - 1].id +1 : 1;

        const newCart = {
            id: newId,
            products: [],
        };

        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(cart => cart.id === cartId);

        if (cartIndex === -1) return null;

        const cart = carts[cartIndex];
        const productInCart = cart.products.find(p=> p.product === product);

        if (productInCart) {
            productInCart.quantity +=1;
        } else {
            cart.products.push({ product : productId, quantity:1});
        }

        await fs.writeFile(this.path, JSON.stringify(carts, null,2));
        return cart;
    }
}

module.exports = CartManager;