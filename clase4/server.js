const http = require('http')

const server= http.createServer((request, response) =>{
    response.end("Hello Word from the backend.")
})

server.listen(8080, () => {
    console.log("servidor corriendo en el puerto 8080")
})