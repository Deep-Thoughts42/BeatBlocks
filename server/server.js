const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(uri=process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () =>
    {
        console.log('Mongoose is connected.')
    }
);


app.use(morgan('tiny'));

app.get('/api', (req, res) => {
    const data = {
        username: 'test',
        age: 5
    };
    res.json(data)

})

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
