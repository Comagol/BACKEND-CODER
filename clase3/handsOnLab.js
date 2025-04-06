function sum(a,b) {
    return new Promise((resolve,reject) => {
        if(a === 0 && b === 0){
            reject("Operacion innecesaria.");
        } else if (a + b < 0){
            reject("La calculadora solo devuelve opearciones positivas.");
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
            reject("La calculadora solo devuelve opearciones positivas.");
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
            reject("La calculadora solo devuelve opearciones positivas.");
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
            reject("La calculadora solo devuelve opearciones positivas.");
        } else {
            resolve(a/b);
        }
    });
};

