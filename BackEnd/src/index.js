const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

// Inicializar configuración de dotenv
dotenv.config();


require('./utils/passport-config');

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || "mongodb+srv://Uziel:admin@web.g4sbtuw.mongodb.net/?retryWrites=true&w=majority&appName=web";

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.use(
  session({
    secret: 'google_auth',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

// Conexión a MongoDB
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Escuchar servidor
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

