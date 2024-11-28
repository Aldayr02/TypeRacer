const passport = require('passport');

// Mostrar la vista de login
exports.login = (req, res) => {
  res.render('login');
};

// Redirigir a Google para autenticarse
exports.googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

// Callback de Google, manejo de la respuesta
// exports.googleCallback = passport.authenticate('google', {
//   successRedirect: '/',
//   failureRedirect: '/login',
// });

const jwt = require('jsonwebtoken');

exports.googleCallback = (req, res, next) => {
  passport.authenticate(
    'google',
    { failureRedirect: 'http://localhost:4200/login' },
    (err, user) => {
      if (err || !user) {
        return res.redirect('http://localhost:4200/login'); // Redirige al frontend en caso de error
      }

      // Inicia la sesión del usuario
      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }

        // Generar un token JWT
        const token = jwt.sign(
          { id: user.id, email: user.email }, // Información del usuario
          'your_jwt_secret', // Llave secreta (debería estar en el .env)
          { expiresIn: '1h' } // Tiempo de expiración
        );

        // Enviar el token al frontend como parte de la redirección
        res.redirect(`http://localhost:4200/home?token=${token}`);
      });
    }
  )(req, res, next);
};

// Mostrar el perfil del usuario autenticado
exports.profile = (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('profile', { user: req.user });
};

// Logout del usuario
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/login');
  });
};
