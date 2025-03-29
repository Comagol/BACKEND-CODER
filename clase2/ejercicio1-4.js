class Auto {
    static kmTotal = 0;
    static currentID =1;

    constructor(modelo) {
        this.id = Auto.currentID++;
        this.modelo = modelo;
        this.kmInd = 0;
    }

    sumKilometros(km) {
        this.kmInd += km;
        Auto.kmTotal += km;
    }

    getKilometrajeIndividual() {
        return this.kmInd;
    }

    static getKilometrajeTotal() {
        return Auto.kmTotal;
    }

}

class Concesionario {
    constructor() {
    this.almacenDeAutos = [];
    }

    agregarAuto(modelo) {
        const nuevoAuto = new Auto(modelo);
        this.almacenDeAutos.push(nuevoAuto);
    }

    buscarAutoPorID(id) {
        const auto = this.almacenDeAutos.find(auto => auto.id === id);

        if(!auto) {
            console.log("auto no encontrado");
            return;
        }

        return auto;

    }
}

// Crear instancia de Concesionario
const concesionario = new Concesionario();

// Agregar autos
concesionario.agregarAuto("Toyota Corolla");
concesionario.agregarAuto("Honda Civic");
concesionario.agregarAuto("Ford Focus");

// Mostrar autos agregados
console.log("Autos en el concesionario:", concesionario.almacenDeAutos);

// Buscar un auto por ID válido
console.log("Buscando auto con ID 2:", concesionario.buscarAutoPorID(2));

// Buscar un auto por ID inválido
console.log("Buscando auto con ID 99:", concesionario.buscarAutoPorID(99));

// Sumar kilómetros a un auto
const autoEncontrado = concesionario.buscarAutoPorID(1);
if (autoEncontrado) {
    autoEncontrado.sumKilometros(500);
    console.log("Kilometraje individual del auto 1:", autoEncontrado.getKilometrajeIndividual());
}

// Verificar kilometraje total
console.log("Kilometraje total de todos los autos:", Auto.getKilometrajeTotal());
