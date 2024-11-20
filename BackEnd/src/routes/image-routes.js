const express = require('express');
const imageController = require('../controllers/image-controller');

const router = express.Router();

router.post('/upload', imageController.uploadImage);
router.get('/image/:key', imageController.getImage);

module.exports = router;
