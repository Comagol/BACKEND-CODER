const  express = require('express');

const app = express();

const PORT = 8080;

//Metodos HTTP
app.get('/', (req,res) =>{
    res.json({
        msg: "GET"
    })
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