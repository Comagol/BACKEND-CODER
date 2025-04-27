// Importo express 
const express = require('express');

// Creo el Router usando express
const router = express.Router();

//Creo un array vacio donde voy a almacenar los autores
let authors = [];

// Creo el metodo GET para mostrar todos los autores
router.get('/', (req,res) => {
    res.status(200).json({ authors });
});

// Creo el metodo POST para poder crear un nuevo autor
router.post('/author', (req,res) => {
    const {name, email, age} = req.body;

    if (!name || !email || !age) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const newAuthor = {
        id: authors.length +1,
        name,
        email,
        age
    };

    authors.push(newAuthor);
    res.status(201).send(`autor ${name} agregado correctamente.`)
});

// exporto todo con module.export
module.exports = router;