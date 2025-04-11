//Importamos moment con require.
const moment = require("moment");

// Creamos una variable con la fecha actual.
const actualDate = moment();

// fecha de naciemiento
const birthday = moment('2024-04-30', 'YYYY-MM-DD');

// Validar si la fecha de naciemiento es valida
if(!birthday.isValid()) {
    console.log("❌ La fecha no es valida.");
} else {
    // Devolvemos la diferencia en dias y segundos desde su nacimiento.
    const daysSinceBirth = actualDate.diff(birthday, "days");
    const secondsSinceBirth = actualDate.diff(birthday, "seconds");

    console.log("fecha actual: ", actualDate.format('YYYY-MM-DD'));
    console.log("fecha de nacimiento: ", birthday.format('YYYY-MM-DD'));
    console.log(`Han pasado ${daysSinceBirth} días desde tu nacimiento.`);
    console.log(`Han pasado ${secondsSinceBirth} segundos desde tu nacimiento.`);
}