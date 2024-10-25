const express = require('express');
const { config } = require('dotenv');
const routes = require('./routes');

// init dotenv config
config();

// variables
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(routes);

// listen
app.listen(port, () => {
  console.log(`App running in port ${port}`);
});
