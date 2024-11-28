const express = require('express');
const upload = require('../middlewares/upload_S3');

const router = express.Router();

router.post('/upload', upload.single('foto'), (req, res) => {
  console.log('Solicitud recibida');
  console.log(req.file);
  if (!req.file) {
    console.log('No se ha enviado ningún archivo');
    return res.status(400).json({ message: 'No se ha enviado ningún archivo' });
  }
  console.log('Archivo recibido', req.file);
  res.json({ message: 'Archivo subido correctamente a S3', file: req.file });
});

module.exports = router;
