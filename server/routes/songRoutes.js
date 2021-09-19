const express = require("express");
const songModel = require("../models/songModel.js");
const app = express();



app.post("/createSong", async (req, res) => {
    try {
        const song = new songModel({parts: [{owner: "none"},{owner: "none"},{owner: "none"},{owner: "none"},{owner: "none"}]});
        song.save((err) => {
            if (err){
                console.log(err)
                res.status(200).send({"error" : "Upload error"}); 
            }
            else{
                res.status(200).send("OK");
            }
        });
    } catch (err) {
        console.log(err)
        res.status(200).send({"error" : "Internal error"});
    }
});

app.get("/getSongs", async (req, res) => {
    try {
        const songs = await songModel.find({})
        res.status(200).send({"songs" : songs});
    } catch (err) {
        res.status(200).send({"error" : "Internal error"});
    }
});

// Owner, Song Id, Part Id
app.post("/buySongPart",  async(req,res) => {
    try{
        const query = {songId: req.body.songId}
        const songs = await songModel.find(query)
        if(songs.length == 0){
            res.status(200).send({"error" : "No song found"});
        }else{
            const parts = songs[0].parts
            parts[req.body.partId].owner = req.body.owner

            songModel.findOneAndUpdate(query, {parts: parts}, function(err, doc) {
                if (err) return res.send(500, {error: err});
                return res.send('OK');
            });
        }
    }catch(err){
        console.log(err)
        res.status(200).send({"error" : "Internal Error"});
    }
});

// Song Id, Part Id, Audio
app.post("/submitSongPart",  async(req,res) => {
    try{
        const query = {songId: req.body.songId}
        const songs = await songModel.find(query)
        if(songs.length == 0){
            res.status(200).send({"error" : "No song found"});
        }else{
            const parts = songs[0].parts
            parts[req.body.partId].audio = req.body.audio

            songModel.findOneAndUpdate(query, {parts: parts}, function(err, doc) {
                if (err) return res.send(500, {error: err});
                return res.send('OK');
            });
        }
    }catch(err){
        console.log(err)
        res.status(200).send({"error" : "Internal Error"});
    }
});

module.exports = app;