const express = require("express");
const songModel = require("../models/songModel.js");
const app = express();



app.post("/createSong", async (req, res) => {
    try {
        const song = new songModel({parts: [{owner: "none"},{owner: "none"},{owner: "none"},{owner: "none"},{owner: "none"}]});
        song.save((err) => {
            if (err){
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

//Owner, Song Id, Part Id
// app.post("/buySongPart",  async(req,res) => {
//     try{
//         const users = await userModel.find({session_id: req.body.session_id})
//         if(users.length == 0){
//             res.status(200).send({"error" : "No user found"});
//         }else{
//             res.status(200).send({"username" : users[0].username, "points" : users[0].points});
//         }
//     }catch(err){
//         res.status(200).send({"error" : "Internal Error"});
//     }

// });



module.exports = app;