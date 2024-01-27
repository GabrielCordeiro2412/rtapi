const express = require('express');
const routes = require('./routes/index');
const http = require('http');
//const passport = require('./middlewares/passport'); // Caminho do arquivo passport.js

const app = express();
const server = http.Server(app);

app.use(express.json());
//app.use(passport.initialize());

routes(app);

const port = 3000;

app.listen(port, () => {
    console.log('listening on port', port)
})

module.exports = app;