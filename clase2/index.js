class Contador {
    static cuentaGlobal = 0; // Variable estática que mantiene la cuenta global

    constructor(responsable) {
        this.responsable = responsable; // Nombre del responsable
        this.cuentaIndividual = 0; // Inicializa el contador en 0
    }

    getResponsable() {
        return this.responsable;
    }

    contar() {
        this.cuentaIndividual++; // Aumenta el contador individual
        Contador.cuentaGlobal++; // Aumenta el contador global
    }

    getCuentaIndividual() {
        return this.cuentaIndividual;
    }

    static getCuentaGlobal() {
        return Contador.cuentaGlobal;
    }
}

const contador1 = new Contador("Juan");
const contador2 = new Contador("Maria");

contador1.contar();
contador1.contar();
console.log(contador1.getCuentaIndividual()); // Debería mostrar 2

contador2.contar();
console.log(contador2.getCuentaIndividual()); // Debería mostrar 1

console.log(Contador.getCuentaGlobal()); // Debería mostrar 3 (porque 2 de Juan + 1 de Maria)
