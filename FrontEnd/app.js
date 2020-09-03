const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = 3131;

app.use(express.static(__dirname + '/dist/help-tab'));

app.get('/aboutCoco', (req, res) => {console.log('hitsssss');res.sendFile(path.join(__dirname))});

const server = http.createServer(app);

server.listen(port, () => console.log('Port Running in '+port));