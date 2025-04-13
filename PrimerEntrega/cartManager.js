// importo con require los modulos necesarios.
const fs = require('fs');
const path = require('path');

// Defino la ruta de carts.json
const pathCarts = path.join(__dirname,'carts.json');

// me aseguro que si no existe el archivo lo cree con writefilesync con un array vacio.
if(!fs.existsSync(pathCarts)) {
    fs.writeFileSync(pathCarts, '[]');
}

// Creo la clase CartManager para luego exportar todos los metodos de la clase dentro.
class CartManager {
    constructor () {
        this.path = pathCarts;
    }

    //Metodo para obtener todos los carritos.
    getCarts() {
        const data = fs.readFileSync(this.path, 'utf-8');
        return JSON.parse(data);
    }

    //metodo para obtener un carrito por ID.
    getCartById(cid) {
        const carts = this.getCarts();
        return carts.find(cart => cart.id === cid);
    }

    // Metodo para crear un carrito, con la logica de manejar sus ID de forma autoincrementable, luego lo pusheo a carts usando carts.push(newCart). y lo reescribo en el path carts.json con writefilesync.
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
    
    // MEtodo para agregar un producto pasando el ID del producto a un carrito especifico pasando su id de carrito como parametros. Obtengo los carritos, luego verifico que el id del carrito que pasaron como parametro este dentro de los carritos que obtengo y manejo que exista el carrito, luego manejo la cantidad del producto a agregar, si ya hay de pid le agregamos una unidad sino le pusheamos la quantity :1. Luego reescribimos toda la informacion actualizada en carts.json.
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
//Exporto CartManager con module.exports
module.exports = CartManager;