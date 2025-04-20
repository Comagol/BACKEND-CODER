const express = require('express');
const UserManager = require('./userManager')
const app =express();
const PORT = 8080;

app.use(express.json());

const manager = new UserManager();

app.post('/users', (req,res) => {
    const {name, lastname, email, password} = req.body;

    if(!name || !lastname || !email || !password) {
        return res.status(400).json({mensaje: 'Faltan campos obligatorios'});
    }

    const newUser = manager.createUser(name, lastname, email, password);
    res.status(201).json({mensaje: 'usuario agregado con exito,', user: newUser});
});

app.get('/users', (req,res) => {
    const users = manager.getUsers();
    res.json(users);
});

app.post('/users/:id/favorites', (req,res) => {
    const uid = parseInt(req.params.id);
    const {product} = req.body;

    if(!product) {
        return res.status(400).json({mensaje: 'Falta el producto.'});
    }

    const result = manager.addFavorite(uid, product);

    if(result === 'Usuario no encontrado'){
        return res.status(404).json({mensaje: result});
    }

    res.status(200).json({mensaje: result});
});

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto${PORT}`);
});
