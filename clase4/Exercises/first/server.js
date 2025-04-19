const ClassManager = require('./classManager');
const express = require('express');

const app = express();
const PORT = 8080;

app.use(express.json());

const manager = new ClassManager;
/*
manager.createUser({
    nombre: 'Francisco',
    apellido: 'Comabella',
    username: 'francom',
    password: "123456"
});

//mostrar usuarios
manager.showUsers();

// Validar usuario
console.log(manager.validateUser('francom', '123456')); // "Logueado"
console.log(manager.validateUser('francom', 'abcdef')); // "Contraseña incorrecta"
console.log(manager.validateUser('otroUser', '123456')); // "Usuario no encontrado"
*/

// creo los endpoints
app.get('/users', (req,res) => {
    const users = manager.getUsers();
    res.json(users);
})

app.post('/users', (req,res) => {
    const {nombre, apellido, username, password} = req.body;

    //Valido que todos los campos estencompletos
    if(!nombre || !apellido || !username || !password) {
        return res.status(400).json({mensaje: 'Faltan campos obligatorios.'});
    }

    const newUser = {
        nombre,
        apellido,
        username,
        password
    };

    const addUser = manager.createUser(newUser);
    res.status(201).json({mensaje:'usuario agregado', user: addUser});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})