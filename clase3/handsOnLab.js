function sum(a,b) {
    return new Promise((resolve,reject) => {
        if(a === 0 || b === 0){
            reject("Operacion innecesaria.");
        } else if (a + b < 0){
            reject("La calculadora solo devuelve operaciones positivas.");
        } else {
            resolve(a+b);
        }
    });
};

function subtracion(a,b) {
    return new Promise((resolve,reject) => {
        if(a === 0 && b === 0){
            reject("Operacion innecesaria.");
        } else if (a - b < 0){
            reject("La calculadora solo devuelve operaciones positivas.");
        } else {
            resolve(a-b);
        }
    });
};

function multi(a,b) {
    return new Promise((resolve,reject) => {
        if(a === 0 && b === 0){
            reject("Operacion innecesaria.");
        } else if (a * b < 0){
            reject("La calculadora solo devuelve operaciones positivas.");
        } else {
            resolve(a*b);
        }
    });
};

function division(a,b) {
    return new Promise((resolve,reject) => {
        if(a === 0 && b === 0){
            reject("Operacion innecesaria.");
        } else if (a / b < 0){
            reject("Fallo en la division.");
        } else {
            resolve(a/b);
        }
    });
};

async function calculadora(a, b) {
    try {
        const suma = await sum(a, b);
        console.log("Resultado Suma:", suma);
     
        const resta = await subtracion(a, b);
        console.log("Resultado Resta:", resta);
   
        const multiplicacion = await multi(a, b);
        console.log("Resultado Multiplicación:", multiplicacion);

        const divisionResultado = await division(a, b);
        console.log("Resultado División:", divisionResultado);
        
    } catch (error) {
        console.log("Error en la división:", error);
    }
}

calculadora(4, 5);
calculadora(5, 5);
calculadora(2, 2);
calculadora(1, 6);