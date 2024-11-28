const jwt = require('jsonwebtoken'); // Para generar JWT
const User = require('../models/users.models');
const { JWT_SECRET } = process.env; // Asegúrate de definir tu clave secreta en el archivo .env

class UsersController {
  // Registro de usuario
  register(req, res) {
    const { name, email, password } = req.body;

    // Aquí, la contraseña no se encripta, se almacena tal cual (sin hash)
    const data = {
      name,
      email,
      password, // Contraseña sin encriptar
    };

    // Guardar al usuario en la base de datos
    User.create(data)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((e) => {
        res.status(400).send('Error al crear el usuario: ' + e);
      });
  }

  // Login de usuario
  login(req, res) {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(400).send('Debe proporcionar un email y una contraseña');
    }

    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(400).send('Credenciales inválidas');
        }

        // Comparar la contraseña ingresada con la almacenada (sin hash)
        if (password !== user.password) {
          return res.status(400).send('Credenciales inválidas');
        }

        // Si la contraseña es correcta, generamos un token JWT
        const token = jwt.sign(
          { id: user._id, email: user.email },
          JWT_SECRET, // Utiliza una clave secreta del archivo .env
          { expiresIn: '1h' } // El token expirará en 1 hora
        );

        // Enviar el token al cliente
        res.status(200).send({ token });
      })
      .catch((e) => {
        res.status(400).send('Error: ' + e);
      });
  }
}

module.exports = UsersController;
