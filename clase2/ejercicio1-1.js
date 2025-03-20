class Jugador {
    static puntosGlobal =0; //valor estático que lleva la cuenta global

    constructor(jugador) {
        this.jugador = jugador; //Nombre del jugador
        this.puntosIndividuales = 0; //contador puntos del jugador
    }

    getNombre() {
        return this.jugador;
    }

    sumarPuntos() {
        this.puntosIndividuales++;//Suma puntaje al jugador de forma individual
        Jugador.puntosGlobal++;// Suma al valor global
    }

    getPuntosIndividuales() {
        return this.puntosIndividuales;
    }

    static getPuntosTotales () {
        return Jugador.puntosGlobal;
    }
}

const jugador1 = new Jugador("Pedro");
const jugador2 = new Jugador("Jose");
const jugador3 = new Jugador("Juana");

jugador1.sumarPuntos();
jugador1.sumarPuntos();
jugador1.sumarPuntos();

console.log(jugador1.getPuntosIndividuales()) //deberia mostrar 3

jugador2.sumarPuntos();
jugador2.sumarPuntos();
console.log(jugador2.getPuntosIndividuales()) //deberia mostrar 2

console.log(Jugador.getPuntosTotales()) //deberia mostrar 5

jugador3.sumarPuntos();
console.log(jugador3.getPuntosIndividuales()) //deberia mostrar 1

console.log(Jugador.getPuntosTotales()) //deberia mostrar 6