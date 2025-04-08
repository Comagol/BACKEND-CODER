const fs = require ('fs')

async function writeFile() {
    const data = "Contenido que se va a escribir en el archivo.txt"

    try {
        await fs.writeFile('archivo.txt', data)
        console.log("Archivo creado y escrito con exito")
    } catch (error){
        console.error("Error al crear el archivo", error)
    }
}

writeFile()