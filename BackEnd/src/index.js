const express = require('express');
const { config } = require('dotenv');
const routes = require('./routes');
const { Server } = require('socket.io');
const leaderboardController = require('./controllers/leaderboard-controller');

// init dotenv config
config();

// variables
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(routes);

// listen
const server = app.listen(port, () => {
  console.log(`App running in port ${port}`);
});

const io = new Server(server);

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Delegar manejo al controlador
  leaderboardController.socketHandler(socket, io);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});
