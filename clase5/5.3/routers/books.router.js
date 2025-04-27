// importo express con require
const express = require('express');

//Creo el Router usando express
const router = express.Router();

//Armo el array vacio para almacenar los libros
let books = [];

// Creo el metodo GET para mostrar todos los libros
router.get('/', (req, res) => {
    res.status(200).json({ books});
});

router.post('/book', (req,res) => {
    const { title, genere, thumbnail, authorId } = req.body;

    if (!title || !genere || !thumbnail || !authorId) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const newBook = {
        id : books.length +1,
        title,
        genere,
        thumbnail,
        authorId
    };

    books.push(newBook);
    res.status(201).send(`libro ${title} agregado correctamente.`)
})

module.exports = router;