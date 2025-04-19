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

    
}