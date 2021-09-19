const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv').config();
const cors = require('cors');

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
app.use(require("./routes/userRoutes.js"))

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



