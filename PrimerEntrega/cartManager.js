const fs = require('fs');
const path = require('path');

const pathCarts = path.join(__dirname,'carts.json');

if(!fs.existsSync(pathCarts)) {
    fs.writeFileSync(pathCarts, '[]');
}

class CartManager {
    constructor () {
        this.path = pathCarts;
    }

    getCarts() {
        const data = fs.readFileSync(this.path, 'utf-8');
        return JSON.parse(data);
    }

    getCartById(cid) {
        const carts = this.getCarts();
        return carts.find(cart => cart.id === cid);
    }

    createCart(){
        const carts = this.getCarts();
        const newCart = {
            id : carts.length > 0 ? carts[carts.length -1]. id + 1 :1,
            products: []
        };
        carts.push(newCart);
        fs.writeFileSync(this.path, JSON.stringify(carts,null,2));
        return newCart;
    }
    
    addProductToCart(cid, pid) {
        const carts = this.getCarts();
        const cartIndex = carts.findIndex(cart => cart.id === cid);
        if(cartIndex === -1) return false;
        const productInCart = carts[cartIndex].products.find(p => p.product === pid);
        if(productInCart) {
            productInCart.quantity++;
        } else {
            carts[cartIndex].products.push({product: pid, quantity: 1});
        }
        fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
        return true;
    }

}

module.exports = CartManager;