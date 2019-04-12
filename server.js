const log = console.log;
// var appJS = require('./assets');
const express = require('express');
const app = express();
var port = process.env.PORT || 8080;
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();


// app.use('/', appJS);
// app.use(express.static(__dirname + '/assets/javascript'));
// app.use(express.static(__dirname + '/assets/javascript'));


// ORIGINAL
app.use(express.static(__dirname + '/assets'));
app.use('/', express.static(path.join(__dirname + '/node_modules')));
// ORIGINAL


// ORIGINAL
// app.post('/', function (req, res) {
//     res.send({ MY_KEY: process.env.MY_KEY, API_KEY: process.env.API_KEY });
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });
// ORIGINAL

app.route('/')
    .post(function (req, res) {
        res.send({ MY_KEY: process.env.MY_KEY, API_KEY: process.env.API_KEY })
    })
    .get(function (req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });



app.listen(port, () => {
    log(`running on ${port}`)
});