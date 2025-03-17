// Este ejercicio lo realiza el profesor de la catedra en el contenido pregrabado del curso.

const fs = require('fs').promises

async function writeFile() {
    const data = "Contenido que se va a escribir en el archivo.txt"

    try {
        await fs.writeFile('archivo.txt', data)
        console.log("Archivo creado y escrito con exito")
    } catch (error){
        console.error("Error al crear el archivo", error)
    }
}

async function appendFile() {
    const data = "\nContenido que se va a añadir en el archivo.txt"

    try {
        await fs.appendFile('archivo.txt', data)
        console.log("Archivo actualizado con exito")
    } catch (error){
        console.error("Error al actualizar el archivo", error)
    }
}

async function unlinkFile() {

    try {
        await fs.unlinkFile('archivo.txt')
        console.log("Archivo eliminado con exito")
    } catch (error){
        console.error("Error al eliminar el archivo", error)
    }
}


writeFile()
appendFile()
unlinkFile()