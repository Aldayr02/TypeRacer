const jwt = require('jsonwebtoken');
const User = require('../models/users.models');

class UserController {
  login = async (req, res) => {
    const { email, password } = req.body;

    try {
      // Buscar usuario por email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          message: 'Invalid email or password',
        });
      }

      // Verificar que la contraseña coincida (sin cifrado)
      if (user.password !== password) {
        return res.status(401).json({
          message: 'Invalid email or password',
        });
      }

      // Crear token
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res.json({
        message: 'Login successful',
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  };
}

module.exports = new UserController();
