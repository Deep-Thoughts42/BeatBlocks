const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { base } = require('./models/songModel.js');
const crypto = require("crypto");



const app = express();
const PORT = process.env.PORT || 8080;


app.use(morgan('tiny'));

app.use(express.json()) 

app.use(cors({origin: 'http://localhost:3000',credentials : true}));
app.use(function (req, res, next) {	
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
    res.setHeader('Access-Control-Allow-Credentials', true);    
    next();
});


//DB
app.use(require("./routes/songRoutes.js"))

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {console.log('Mongoose is connected.')});


app.get('/', (req,res) =>{
    res.send("yo")
});

app.listen(PORT, ()=>{
    console.log("Port: " +  PORT)
})


var ffmpeg = require('fluent-ffmpeg');
const fs = require('fs')

app.post('/stackAudio', (req,res) =>{
    console.log(req.body.filesArray)
    const files = completeAudio(req.body.filesArray)
    res.status(200).send({files: files})
});

app.post('/concatinateAudio', (req,res) =>{
    const files = completeAudio(req.body.filesArray)
    res.status(200).send("OK")
});

function completeAudio (filesArray) {
    let final_list = []
    for(var i = 0; i < filesArray.length; i++)  {
        let filename = "./"+ crypto.randomBytes(20).toString('hex')+".mp3";
        if (filesArray[i].length > 1)  {
        
            mixAudio(filesArray[i], filename, './tmp')
            final_list.push(filename)

        }
        else {
            final_list.push(filesArray[i][0])
        }
    }
    return final_list
}

// Layer tracks on top of eachother
function mixAudio (filesArray, endPath, tempPath) {
    var chainedInputs = filesArray.reduce((result, inputItem) => result.addInput(inputItem), ffmpeg());
    chainedInputs
    .complexFilter([{
    filter: 'amix',
    inputs: chainedInputs.length,
    options: ['duration=first','dropout_transition=0']
    }])
    .output(endPath, tempPath);

}

// Add tracks to the back of eachother
function concatenateAudio (filesArray, endPath, tempPath) {
    var chainedInputs = filesArray.reduce((result, inputItem) => result.addInput(inputItem), ffmpeg());
    chainedInputs.mergeToFile(endPath, tempPath)
}
