const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const pathUsers = path.join(__dirname, 'users.json');

if (!fs.existsSync(pathUsers)) {
    fs.writeFileSync(pathUsers, '[]');
}

class ClassManager {
    constructor() {
        this.path = pathUsers;
    }

    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    getUsers() {
        const data = fs.readFileSync(this.path, 'utf-8');
        if (!data) return [];
        return JSON.parse(data);
    }
    

    saveUsers(users) {
        fs.writeFileSync(this.path, JSON.stringify(users, null, 2));
    }

    createUser({ nombre, apellido, username, password }) {
        const users = this.getUsers();
        const newUser = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            nombre,
            apellido,
            username,
            password: this.hashPassword(password)
        };
        users.push(newUser);
        this.saveUsers(users);
        return newUser;
    }

    showUsers() {
        const users = this.getUsers();
        console.log(users);
    }

    validateUser(username, password) {
        const users = this.getUsers();
        const user = users.find(u => u.username === username);
        if (!user) return 'Usuario no encontrado';

        const hashed = this.hashPassword(password);
        return user.password === hashed ? 'Logueado' : 'Contraseña incorrecta';
    }
}

module.exports = ClassManager;
