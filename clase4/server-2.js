const  express = require('express');
const app = express();
const PORT = 3000;

//Middleware para poder trabajar con datos JSON
app.use(express.json());

//Array
let usuarios = [];

//Metodos HTTP
app.get('/usuarios', (req,res) =>{
    res.json(usuarios)
})

app.post('/usuarios', (req,res) =>{
    const {nombre, edad} = req.body
    const nuevoUsuario = {id: usuarios.length + 1, nombre, edad}
    usuarios.push(nuevoUsuario)
    res.status(201).json(nuevoUsuario)
})

app.put('/', (req,res) =>{
    res.json()
})

app.delete('/', (req,res) =>{
    res.json()
})

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})