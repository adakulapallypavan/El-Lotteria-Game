
// models/Grid.js
const mongoose = require('mongoose');

const gridSchema = new mongoose.Schema({
  grid1: [[Number]],  // 2D array of numbers for User 1
  grid2: [[Number]],  // 2D array of numbers for User 2
  winner: {
    type: String,
    default: ''
  },
});

const Grid = mongoose.model('Grid', gridSchema);

module.exports = Grid;
