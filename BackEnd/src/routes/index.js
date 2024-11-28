const router = require('express').Router();
const users = require('./user-routes');
const authgoogle = require('./google-routes');
const changebg = require('./image-routes');

router.use('/users', users);
router.use('/auth', authgoogle);
router.use('/change-bg', changebg);

router.get('/', (req, res) => {
  res.send(`API WORKING`);
});

module.exports = router;
