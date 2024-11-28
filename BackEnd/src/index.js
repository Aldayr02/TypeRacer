const express = require('express');
const { config } = require('dotenv');
const routes = require('./routes');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

// init dotenv config
config();

require('./utils/passport-config');

// variables
const app = express();
const port = process.env.PORT || 3000;

// middleware
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

// listen
const server = app.listen(port, () => {
  console.log(`App running in port ${port}`);
});
