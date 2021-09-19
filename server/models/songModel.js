const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const SongSchema = new mongoose.Schema({
  parts: {
    type: [{
      audio: {type: String},
      owner: {type: String}
    }],
    default: [],
  },
  completed: {
    type: String,
  },
  songId: {
    type: String,
    unique : true, 
    dropDups: true,
    default: uuidv4
  }
});

module.exports = mongoose.model("Songs", SongSchema);

