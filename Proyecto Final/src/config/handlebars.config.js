const exphbs = require('express-handlebars');

const hbs = exphbs.create({
    helpers: {
        multiply: function(a, b) {
            return a * b;
        }
    }
});

module.exports = hbs; 