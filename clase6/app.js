const express = require('express');
const http = require('https').createServer(app);
const io = require(socket.io)(http)

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.listen(PORT, () => {
    console.log(`Server runing in port ${PORT}`);
});