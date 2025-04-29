const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

//Routers
const authorsRouter = require('./routers/authors.router');
const booksRouter = require('./routers/books.router');

const app = express();
const PORT = 3000;

//middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Servir archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Configuracion de Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

// Vistas para agregar libros y autores
app.get('/add-book', (req, res) => {
    res.render('addBook');
});

app.get('/add-author', (req, res) => {
    res.render('addAuthor');
});

app.use('/api/authors', authorsRouter);
app.use('/api/books', booksRouter);

// Arranco el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});