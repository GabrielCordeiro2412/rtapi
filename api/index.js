const express = require('express');
const routes = require('./routes/index');
const http = require('http');

const app = express();
const server = http.Server(app);

routes(app);

const port = 3000;

app.listen(port, () =>{
    console.log('listening on port', port)
})

module.exports = app;