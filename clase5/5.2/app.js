const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const PORT = 3000;

// Importar routers
const usersRouter = require('./routers/users.router');
const petsRouter = require('./routers/pets.router');

// Middleware para parsear JSON y para llegar a la ruta public
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

// Montar routers
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/', usersRouter);

// Iniciar server
app.listen(PORT, () => {
    console.log(`Server corriendo en puerto ${PORT}`);
});
