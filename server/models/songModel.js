const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
var generate = require('project-name-generator');

function titleCase() {
  var str = generate({words: 3}).spaced
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

const SongSchema = new mongoose.Schema({
  songName: {
    type: String,
    default: titleCase,
  },
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

