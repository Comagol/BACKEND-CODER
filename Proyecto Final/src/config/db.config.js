const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI no está definida en las variables de entorno');
        }

        // Log temporal para verificar la URL (ocultando la contraseña)
        const maskedUri = process.env.MONGODB_URI.replace(/(mongodb\+srv:\/\/[^:]+:)[^@]+(@.*)/, '$1****$2');
        console.log('Intentando conectar a:', maskedUri);

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB conectado exitosamente');
    } catch (error) {
        console.error('❌ Error al conectar con MongoDB:', error.message);
        console.log('Por favor, asegúrate de:');
        console.log('1. Tener un archivo .env con MONGODB_URI definida');
        console.log('2. Tener una conexión a internet activa');
        console.log('3. Tener las credenciales correctas en la URL de conexión');
        process.exit(1);
    }
};

module.exports = connectDB; 