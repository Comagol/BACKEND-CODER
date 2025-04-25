const express = require('express');
const router = express.Router();

let users = [
    { nombre: "Juan", apellido: "Pérez", edad: 30, correo: "juan@mail.com", telefono: "123456789" },
    { nombre: "Ana", apellido: "Gómez", edad: 25, correo: "ana@mail.com", telefono: "987654321" },
    { nombre: "Luis", apellido: "Martínez", edad: 40, correo: "luis@mail.com", telefono: "456789123" },
    { nombre: "Lucía", apellido: "Rodríguez", edad: 28, correo: "lucia@mail.com", telefono: "321654987" },
    { nombre: "Carlos", apellido: "López", edad: 35, correo: "carlos@mail.com", telefono: "741852963" },
];

router.get('/', (req,res) => {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    res.render('home', randomUser);
});

router.post('/', (req,res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json({ mensaje: 'Usuario agregado', user});
});

module.exports = router;