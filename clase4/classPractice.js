//Importamos moment con require.
const moment = require("moment");

// Creamos una variable con la fecha actual.
const actualDate = moment();

// fecha de naciemiento
const birthday = moment('2006-01-26', 'YYYY-MM-DD');

// Validar si la fecha de naciemiento es valida
if(!birthday.isValid()) {
    console.log("❌ La fecha de cumpleaños no es valida.");
} else {
    // Devolvemos la diferencia en dias desde su nacimiento.
    const daysSinceBirth = actualDate.diff(birthday, "days");

    console.log("fecha actual: ", actualDate.format('YYYY-MM-DD'));
    console.log("fecha de nacimiento: ", birthday.format('YYYY-MM-DD'));
    console.log(`Han pasado ${daysSinceBirth} días desde tu nacimiento.`)
}