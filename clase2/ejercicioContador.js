class Contador {
    static globalCount = 0;

    constructor(nombre) {
        this.personalCount = 0;
        this.responsable = nombre;
    }

    count() {
        Contador.globalCount ++;
        this.personalCount ++;
    }

    getResponsable() {
        return this.responsable;
    }

    getCuentaInd() {
        return this.personalCount;
    }

    static getCuentaGlobal() {
        return Contador.globalCount
    }
}

const cuentaLucas = new Contador("lucas");
const cuentaRoberto = new Contador("Roberto");

cuentaLucas.count();
cuentaLucas.count();
cuentaLucas.count();
cuentaRoberto.count();

console.log("Cuenta global:", Contador.getCuentaGlobal());
console.log("Cuenta individual de ",cuentaLucas.getResponsable(),":" ,cuentaLucas.getCuentaInd());
console.log("Cuenta individual de ",cuentaRoberto.getResponsable(),":" ,cuentaLucas.getCuentaInd());