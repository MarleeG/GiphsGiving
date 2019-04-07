const log = console.log;
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static(__dirname + '/assets'));
app.use('/', express.static(path.join(__dirname + '/node_modules')));

app.post('/', function (req, res) {
    res.send({MY_KEY: process.env.MY_KEY, API_KEY: process.env.API_KEY});
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});



app.listen(PORT);