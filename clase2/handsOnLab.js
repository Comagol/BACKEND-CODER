class TicketManager {
    // con el # hacemos que sean privadas
    #eventos;
    #baseDeGanancia;
    #currentID;

    constructor() {
        this.#eventos = []; // Array donde vamos a almacenar los eventos
        this.#baseDeGanancia = 0.15; // Margen de ganancia sobre el precio
        this.#currentID = 1; // ID autoincrementable para los eventos
    }

    getEventos() {
        return this.#eventos;
    }

    agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date()) {
        const precioFinal = precio * (1 + this.#baseDeGanancia); // Aplica el margen de ganancia
        
        const nuevoEvento = {
            id: this.#currentID++, // ID autoincrementable
            nombre,
            lugar,
            precio: precioFinal,
            capacidad,
            fecha,
            participantes: []
        };

        this.#eventos.push(nuevoEvento);
    }

    agregarUsuario(idEvento, idUsuario) {
        const evento = this.#eventos.find(evento => evento.id === idEvento);

        if (!evento) {
            console.log("Evento no encontrado.");
            return;
        }

        if (evento.participantes.includes(idUsuario)) {
            console.log("Este usuario ya está registrado en el evento.");
            return;
        }

        evento.participantes.push(idUsuario);
    }

    ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha) {
        const eventoOriginal = this.#eventos.find(evento => evento.id === idEvento);
    
        if (!eventoOriginal) {
            console.log("Evento no encontrado.");
            return;
        }

        const nuevoEvento = {
            ...eventoOriginal, // Copia todas las propiedades
            id: this.#currentID++, // Nuevo ID único (corregido)
            lugar: nuevaLocalidad, // Actualiza la ubicación
            fecha: nuevaFecha, // Actualiza la fecha
            participantes: [] // Reinicia la lista de participantes
        };

        this.#eventos.push(nuevoEvento);
    }
}

// Pruebas
const manager = new TicketManager();

// Agregar eventos (corregido: se incluye el precio)
manager.agregarEvento("Concierto de Rock", "Buenos Aires", 1000);
manager.agregarEvento("Obra de Teatro", "Córdoba", 1500);

// Mostrar eventos
console.log(manager.getEventos());
//console.log(manager.#eventos) demostracion de porque se crean los getter el # hace que los campos sean privados

// Agregar usuarios a eventos
manager.agregarUsuario(1, 101);
manager.agregarUsuario(1, 102);
manager.agregarUsuario(2, 201);

// Mostrar eventos nuevamente
console.log(manager.getEventos());

// Copiar evento a otra ciudad
manager.ponerEventoEnGira(1, "Rosario", new Date("2025-06-10"));

// Verificar que el nuevo evento se agregó
console.log(manager.getEventos());
