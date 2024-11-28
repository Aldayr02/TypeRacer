const express = require('express');
const upload = require('../middlewares/upload_S3');

const router = express.Router();

router.post('/upload', upload.single('foto'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha enviado ningún archivo' });
    }
    res.json({ message: 'Archivo subido correctamente a S3', file: req.file });
});

module.exports = router;
