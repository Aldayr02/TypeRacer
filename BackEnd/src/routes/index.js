const router = require('express').Router();
const users = require('./user-routes');
const authgoogle = require('./google-routes');

router.use('/users', users);
router.use('/auth', authgoogle);

router.get('/', (req, res) => {
  res.send(`API WORKING`);
});

module.exports = router;
