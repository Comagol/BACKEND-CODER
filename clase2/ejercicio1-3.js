class Auto {
    static kilometrajeTotal = 0;

    constructor(marca) {
        this.marca = marca;
        this.kilometrosIndividual = 0;
    }

    getMarca() {
        return this.marca;
    }

    sumKilometros(km) {
        this.kilometrosIndividual += km;
        Auto.kilometrajeTotal += km;
    }

    getKilometrajeIndividual() {
        return this.kilometrosIndividual;
    }

    static getKilometroTotales() {
        return Auto.kilometrajeTotal;
    }
}

const auto1 = new Auto("Ford");
const auto3 = new Auto("Renault");
const auto2 = new Auto("Peugeot");

auto1.sumKilometros(700);
auto1.sumKilometros(50);
auto2.sumKilometros(4500);
auto3.sumKilometros(600);

console.log(auto2.getKilometrajeIndividual()); //deberia mostrar 4.500 km
console.log(Auto.getKilometroTotales());