// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Grid = require('./models/Grid');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (replace with your local MongoDB connection string)
mongoose.connect('mongodb://127.0.0.1/el-lotteria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Error connecting to MongoDB:", err));

// API to start a new game
app.post('/api/start-game', async (req, res) => {
  const { grid1, grid2 } = req.body;
  const newGame = new Grid({ grid1, grid2 });
  await newGame.save();
  res.json({ message: 'Game started', game: newGame });
});

// API to generate a random number and update grids
app.get('/api/generate-number', async (req, res) => {
  const game = await Grid.findOne().sort({ _id: -1 });  // Get the latest game
  const allNumbers = [...new Set([...game.grid1.flat(), ...game.grid2.flat()])].filter(n => n);

  // Pick a random number
  const randomNumber = allNumbers[Math.floor(Math.random() * allNumbers.length)];
  
  // Update the grids by crossing out the number
  const updatedGrid1 = game.grid1.map(row => row.map(cell => (cell === randomNumber ? null : cell)));
  const updatedGrid2 = game.grid2.map(row => row.map(cell => (cell === randomNumber ? null : cell)));

  // Check if there's a winner
  const checkWinner = (grid) => {
    const winningCombinations = [
      [grid[0][0], grid[0][1], grid[0][2]], // Row 1
      [grid[1][0], grid[1][1], grid[1][2]], // Row 2
      [grid[2][0], grid[2][1], grid[2][2]], // Row 3
      [grid[0][0], grid[1][0], grid[2][0]], // Col 1
      [grid[0][1], grid[1][1], grid[2][1]], // Col 2
      [grid[0][2], grid[1][2], grid[2][2]], // Col 3
    ];

    return winningCombinations.some(combination => combination.every(num => num === null));
  };

  let winner = '';
  if (checkWinner(updatedGrid1)) winner = 'User 1';
  if (checkWinner(updatedGrid2)) winner = 'User 2';

  // Update and save game state
  game.grid1 = updatedGrid1;
  game.grid2 = updatedGrid2;
  game.winner = winner;
  await game.save();

  res.json({ randomNumber, updatedGrid1, updatedGrid2, winner });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
