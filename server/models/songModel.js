const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  parts: {
    type: [{
      audio: {type: String, default: null},
      owner: {type: String,}
    }],
    default: [],
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Songs", SongSchema);

