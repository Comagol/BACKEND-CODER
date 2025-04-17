const ClassManager = require('./classManager');
const manager = new ClassManager;

manager.createUser({
    nombre: 'Francisco',
    apellido: 'Comabella',
    username: 'francom',
    password: "123456"
});

//mostrar usuarios
manager.showUsers();

// Validar usuario
console.log(manager.validateUser('francom', '123456')); // "Logueado"
console.log(manager.validateUser('francom', 'abcdef')); // "Contraseña incorrecta"
console.log(manager.validateUser('otroUser', '123456')); // "Usuario no encontrado"