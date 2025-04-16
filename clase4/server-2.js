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

app.post('/', (req,res) =>{
    res.json({
        msg: "POST"
    })
})

app.put('/', (req,res) =>{
    res.json({
        msg: "PUT"
    })
})

app.delete('/', (req,res) =>{
    res.json({
        msg: "DELETE"
    })
})

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})