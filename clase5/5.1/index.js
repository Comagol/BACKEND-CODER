const express = require("express");
const handlebars = require("express-handlebars")

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/views'));

app.get('/', (req,res) => {
    let test = {
        name: "fran",
        last_name: "Comabella"
    }

    res.render('index' , test);
})

app.listen(PORT, () => {
    console.log(`Server runing in ${PORT}`);
})