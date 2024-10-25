const jwt = require('jsonwebtoken');

class UserController {
  login = (req, res) => {
    const { username, password } = req.body;

    // Hardcoded credentials for testing
    const hardcodedUsername = 'admin';
    const hardcodedPassword = '1234';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      // Create a token
      const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });

      return res.json({
        message: 'Login successful',
        token,
      });
    }

    return res.status(401).json({
      message: 'Invalid credentials',
    });
  };
}

module.exports = new UserController();
