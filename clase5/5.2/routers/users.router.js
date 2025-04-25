const express = require('express');
const router = express.Router();

let users = [];
/*
router.get('/', (req,res) => {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    res.render('home', randomUser);
});*/

router.get('/register', (req,res) => {
    res.render('register');
});

router.post('/user', (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).send('Todos los campos son obligatorios');
    }
  
    const newUser = { name, email, password };
    users.push(newUser);
  
    res.status(200).send(`Usuario ${name} registrado correctamente`);
  });

  router.get('/', (req, res) => {
    res.status(200).json({ users });
  });

module.exports = router;