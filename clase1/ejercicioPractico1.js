class Productmanager {
    constructor() {
        this.products = []; //Aca almacenamos los productos
        this.currentID = 1; //Contador para generar ID´s unicos
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Validar que todos los campos esten presentes
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        // Validar que el codigo no se repita
        if (this.products.some(product => product.code === code)) {
            console.log(`El código ${code} ya está en uso`);
            return;
        }

        // Crear el nuevo producto

        const newProduct = {
            id : this.currentID++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.push(newProduct);
    }

    getProduct() {
        return this.products;
    }

    getProductById(id){
        const product = this.products.find(prod => prod.id === id);
        if (!product) {
            console.log("Not found");
            return;
        }
        return product;
    }
}

// Pruebas
const manager = new Productmanager();
// Agregamos los productos
manager.addProduct("Producto 1", "descripcion 1", 100, "img1.png", "abc123",10);
manager.addProduct("Producto 2", "descripcion 2", 1000, "img2.png", "efg456",20);

// Obtenemos todos los productos
console.log(manager.getProduct());

//Buscar por ID
console.log(manager.getProductById(1));
console.log(manager.getProductById(5));