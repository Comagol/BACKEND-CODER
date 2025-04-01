const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function generarNumeroRandom(min, max) {
    return Math.floor(Math.random()* (max-min +1)) + min;
}

function generarNumerosRandom(cantidad,min,max) {
    return new Promise(async(resolve) => {
        const numbers = {};
        for (let i = 0; i < cantidad;  i++) {
            const numeroRandom = generarNumeroRandom(min, max);
            await esperar(100);
            numbers[numeroRandom] = (numbers[numeroRandom] || 0) +1;
        };
        resolve(numbers);
    })
}

//console.log(numbers); esto sale vacio porque no espera al settimeout

generarNumerosRandom(50,1,10).then(resultado => console.log(resultado));