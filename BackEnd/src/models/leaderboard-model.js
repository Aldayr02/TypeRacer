let leaderboard = [
  { username: 'Player1', score: 50 },
  { username: 'Player2', score: 40 },
];

module.exports = {
  getLeaderboard: () => leaderboard,
  updateScore: (username, score) => {
    const player = leaderboard.find((p) => p.username === username);
    if (player) {
      player.score = score;
    } else {
      leaderboard.push({ username, score });
    }
    leaderboard.sort((a, b) => b.score - a.score);
    return leaderboard;
  },
};
