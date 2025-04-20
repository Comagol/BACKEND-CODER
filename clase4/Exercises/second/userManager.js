const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const pathUsers = path.join(__dirname, 'users.json');

if(!fs.existsSync(pathUsers)) {
    fs.writeFileSync(pathUsers, '[]');
};

class UserManager {
    constructor() {
        this.path = pathUsers;
    }

    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    getUsers() {
        const data = fs.readFileSync(this.path, 'utf-8');
        if(!data) return[];
        return JSON.parse(data);
    }

    createUser(name, lastname, email, password){
        const users = this.getUsers();
        const newUser = {
            id: users.length > 0 ? users[users.length - 1].id + 1 :1,
            name,
            lastname,
            email,
            password: this.hashPassword(password)
        };
        users.push(newUser);
        this.saveUsers(users);
        return newUser;
    }

    saveUsers(users){
        fs.writeFileSync(this.path, JSON.stringify(users, null, 2));
    }

    gerUserById(uId) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === Number(uId));
    
        if(index === -1) return null; 
    
        return { user: users[index], index, users };
    }

    addFavorite(uId, product) {
        const result = this.gerUserById(uId);
        if (!result) return 'Usuario no encontrado';
    
        const { user, index, users } = result;
    
        if (!user.favorites) {
            user.favorites = [];
        }
    
        user.favorites.push(product);
        users[index] = user;
    
        this.saveUsers(users);
        return 'Producto agregado a favoritos';
    }
}

module.exports = UserManager;