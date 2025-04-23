const express = require('express');
const app = express();
const PORT = 3000;

// Importar routers
const usersRouter = require('./routers/users.router');
const petsRouter = require('./routers/pets.router');

// Middleware para parsear JSON
app.use(express.json());

// Montar routers
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

// Iniciar server
app.listen(PORT, () => {
    console.log(`Server corriendo en puerto ${PORT}`);
});
