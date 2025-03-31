// OPERACIONES MATEMATICAS
async function cargarOperacionesMatematicas() {
    try {
        const module = await import('./operacionesMatematicas.js')

        console.log(module.sumar(5,3));
        console.log(module.restar(5,3));
        console.log(module.multiplicar(5,3));
        console.log(module.dividir(5,3));
    } catch (error) {
        console.error("Error en la cargar del module", error)
    }
}

cargarOperacionesMatematicas();