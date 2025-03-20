console.log('Hola mundo desde NodeJs');
console.warn('Esto es una alarma desde NodeJs');
console.error('Esto es un error desde NodeJs');

// var variable1 = 1; problema de scoupe
let variable2 = 2;
const variable3 = 3;

function mostrarLista(arr) {
    if (!arr.length) {
        return "Lista vacia";
    }
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i])
    }
    return `La longitud de la lista es ${arr.length}`
}

const mostrarListaFlecha = (arr) => {
    if (!arr.length) {
        return "lista vacia";
    }
    for (let i =0; i < arr.length; i++) {
        console.log(arr[i])
    }
    return `La longitud de la lista es ${arr.length}`
}

mostrarListaFlecha([1,2,3,4])