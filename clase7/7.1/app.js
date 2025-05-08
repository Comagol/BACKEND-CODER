const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB");

    const db = client.db("practicaMongo");
    const usersCollection = db.collection("users");

    // Insertar un usuario
    await usersCollection.insertOne({
      nombre: "Francisco",
      edad: 27,
      email: "fran@mail.com"
    });

    // Mostrar todos los usuarios
    const users = await usersCollection.find().toArray();
    console.log("Usuarios en la base:");
    console.log(users);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

async function buscarUsuarioPorNombre(nombre) {
    try {
      const usuario = await usersCollection.findOne({ nombre: nombre });
  
      if (usuario) {
        console.log("Usuario encontrado:");
        console.log(usuario);
      } else {
        console.log("No se encontró ningún usuario con ese nombre.");
      }
    } catch (error) {
      console.error("Error al buscar el usuario:", error);
    }
  }

main();
