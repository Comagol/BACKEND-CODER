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
    
    

}