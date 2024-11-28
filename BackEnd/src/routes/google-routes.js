const express = require('express');
const router = express.Router();
const authController = require('../controllers/google-controller');

// Rutas de autenticación
// router.get('/login', authController.login);
router.get('/google', authController.googleLogin);
router.get('/google/callback', authController.googleCallback);
router.get('/profile', authController.profile);
router.get('/logout', authController.logout);

module.exports = router;
