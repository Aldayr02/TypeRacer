const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const { Server } = require('socket.io');
const leaderboardController = require('./controllers/leaderboard-controller');
const cors = require('cors');
const mongoose = require('mongoose');

// Inicializar configuración de dotenv
dotenv.config();

// Variables
const app = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || "mongodb+srv://Uziel:admin@web.g4sbtuw.mongodb.net/?retryWrites=true&w=majority&appName=web";

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
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

// Configuración de WebSocket con Socket.io
const io = new Server(server);

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Delegar manejo al controlador
  leaderboardController.socketHandler(socket, io);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});
