// importo express y multer con require
const express = require('express');
const multer = require('multer');

//Configuracion del Multer
const storage = multer.diskStorage({
    destination: function(req, file, cd) {
        cb(null, 'public/uploads'); //En esta carpeta se guardaran las imagenes
    },
    filename: function(req, file , cb) {
        cb(null, Date.now() + '-' +file.originalname); //nombre unico del archivo
    }
});

const upload = multer({ storage })
;
//Creo el Router usando express
const router = express.Router();

//Armo el array vacio para almacenar los libros
let books = [];

// Creo el metodo GET para mostrar todos los libros
router.get('/', (req, res) => {
    res.status(200).json({ books});
});

router.post('/book', upload.single('thumbnail') , (req,res) => {
    const { title, genere, authorId } = req.body;
    const thumbnail = req.file ? `uploads/${req.file.filename}` : null;

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

//Creo otro metodo get para mostrar la lista de libros en books.handlebars
router.get('/view', (req,res) => {
    res.render('books', {books});
});

module.exports = router;