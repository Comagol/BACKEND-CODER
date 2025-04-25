const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

let pets = [];

router.get('/', (req,res) => {
    res.json(pets);
});

router.post('/', upload.single('file'), (req, res) => {
    const { name, type } = req.body;
    const file = req.file;

    const pet = {
        name,
        type,
        thumbnail: file ? '/uploads/' + file.filename : null
    };

    pets.push(pet);
    res.status(201).json({ mensaje: "Mascota Agregada con imagen", pet });
});

module.exports = router