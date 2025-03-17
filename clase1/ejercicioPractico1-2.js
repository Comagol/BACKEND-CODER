class UserManager {
    constructor() {
        this.ussers = []; // Inicializo un array vacio para almacenar los usuario del manager
        this.currentId = 1; // Contador de Id´s
    }

    addUsser(name, email, password, age) {
        // Validamos que todos campos traigan informacion
        if (!name || !email || !password || !age) {
            console.error("Every fild is obligatory");
            return;
        }

        // Validar que el email no se repita
        if (this.ussers.some(usser => usser.email === email)) {
            console.error(`This Email ${email} has already been used.`);
            return
        }

        if (typeof age !== "number" || age <= 0) {
            console.error("Age must be a positive number.");
            return;
        }

        // Creamos el usser.

        const newUsser = {
            id : this.currentId++,
            name,
            email,
            password,
            age,
        };

        this.ussers.push(newUsser);
    }

    // Funcion para devolver todos los usuarios
    getUssers() {
        return this.ussers;
    }

    // Funcion para devolver un usuario en particular filtrado por id
    getUsserById(id) {
        const usser = this.ussers.find(usser => usser.id === id);
        if (!usser) {
            console.log("Usser not found.");
            return;
        }
        return usser;
    }

}

//Pruebas
const manager = new UserManager();
//Agregamos ussers
manager.addUsser("Pedro", "pedro@hotmail.com", "1a2b3c4d", 18);
//prueba que no agregue este usser porque el mail se repite
manager.addUsser("Pedro", "pedro@hotmail.com", "1a2b3c4d", 18);
manager.addUsser("matilda", "matilda@hotmail.com", "a1a1a1a", 28);

console.log(manager.getUssers());

console.log(manager.getUsserById(1));
console.log(manager.getUsserById(2));
console.log(manager.getUsserById(5));
