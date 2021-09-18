const express = require("express");
const userModel = require("../models/user.js");
const app = express();


app.post("/validateSession_id",  async(req,res) => {
    try{
        const users = await userModel.find({session_id: req.body.session_id})
        if(users.length == 0){
            res.status(200).send({"error" : "No user found"});
        }else{
            res.status(200).send({"username" : users[0].username, "points" : users[0].points});
        }
    }catch(err){
        res.status(200).send({"error" : "Internal Error"});
    }

});

app.post("/login", async (req, res) => {
    try {
        const users = await userModel.find({username: req.body.username});
        if(users.length == 0){
            res.status(200).send({"error" : "No username found"});
        }
        else if(users[0].password != req.body.password){
            res.status(200).send({"error" : "Incorrect password"});
        }else{
            res.status(200).send({"session_id": users[0].session_id})
        }
    } catch (err) {
        res.status(200).send({"error" : "Internal Error"});
    }
});

app.post("/signup", async (req, res) => {
    try {
        const user = new userModel(req.body);

        user.save((err) => {
            if (err){
                if(err.keyPattern.username){
                    res.status(200).send({"error" : "Duplicate Username"});
                }
                else if(err.keyPattern.email){
                    res.status(200).send({"error" : "Duplicate Email"});
                }
                else {
                    res.status(200).send({"error" : "Upload error"});
                }
                
            }
            else{
                res.status(200).send("OK");
            }
        });
    } catch (err) {
        res.status(200).send({"error" : "Internal error"});
    }
  });

module.exports = app;