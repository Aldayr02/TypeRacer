const { upload } =  require('../middlewares/upload_S3');

const router = require('express').Router();

router.post('/upload', upload.single('foto'), (req, res) => {
    res.send(`Image uploaded`);
});

module.exports = router;