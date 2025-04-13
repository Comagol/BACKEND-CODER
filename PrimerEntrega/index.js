// Importo con require los modulos necesarios
const ProductManager = require ('./productManager');
const CartManager = require('./cartManager');

// Instancio las clases para poder usar sus metodos.
const productManager = new ProductManager();
const cartManager = new CartManager();

//Agrego un nuevo producto con el metodo addProduct con un objeto que reprensenta al producto.
// El producto se va a almacenar en products.json
productManager.addProduct({
    title : "Computadora",
    description : "Laptop de ultima generacion con detalles gamer",
    code : "COMP10",
    price : 1500,
    status : true,
    category : "Tecnologia",
    thumbnails : ["img/computadora1.jpg"]
}) 

//Agrego un nuevo producto usando el mismo metodo(addProduct), que se va a almacenar en products.json.
productManager.addProduct({
    title : "Celular",
    description : "samsung galaxy a23",
    code : "SAM23",
    price : 600,
    status : true,
    category : "Electronica",
    thumbnails : ["img/celular1.jpg"]
}) 

// Muestro por consola los productos almacenados hasta el momento.
console.log("Productos: ", productManager.getProduct());

//modifico el precio del producto con id 1, como segundo parametro paso la clave y valor a modificar.
productManager.updateProduct(1, { price: 1600});

//muestro el producto actualizado usando el metodo getProductsById pasando el id como parametro.
console.log("Producto actualizado: ", productManager.getProductById(1));

// Creo un nuevo carrito utilizando el método createCart.
// Este carrito se guarda en carts.json con un id autoincrementable y un array vacío de productos.
const nuevoCarrito = cartManager.createCart();
console.log("Carrito creado:", nuevoCarrito);

// Agrego productos al carrito recién creado usando su id y el id de los productos.
// Si el producto ya está en el carrito, se incrementa la cantidad. Si no está, se agrega con cantidad 1.
cartManager.addProductToCart(nuevoCarrito.id,1);
cartManager.addProductToCart(nuevoCarrito.id,2);

// Incremento la cantidad de productos del producto 1
cartManager.addProductToCart(nuevoCarrito.id,1);

// Muestro por consola el carrito con los productos agregados y sus cantidades.
console.log("Carrito de compras actualizada: ", cartManager.getCartById(nuevoCarrito.id));