const express = require('express');
const router = express.Router();

let users = [];

router.get('/', (req,res) => {
    res.json(users);
});

router.post('/', (req,res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json({ mensaje: 'Usuario agregado', user});
});

module.exports = router;