const leaderboardModel = require('../models/leaderboard-model');

class leaderboardController {
  socketHandler = (socket, io) => {
    // Enviar el leaderboard inicial
    socket.emit('update-leaderboard', leaderboardModel.getLeaderboard());

    // Escuchar actualizaciones de puntajes
    socket.on('update-score', (data) => {
      const { username, score } = data;

      // Actualizar modelo
      const updatedLeaderboard = leaderboardModel.updateScore(username, score);

      // Enviar actualización a todos los clientes conectados
      io.emit('update-leaderboard', updatedLeaderboard);
    });
  };

  getLeaderboard = () => {
    res.status(200).json(leaderboardModel.getLeaderboard());
  };

  updateScore = () => {
    const { username, score } = req.body;

    if (!username || score == null) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    const updatedLeaderboard = leaderboardModel.updateScore(username, score);
    res.status(200).json(updatedLeaderboard);
  };
}

module.exports = new leaderboardController();
