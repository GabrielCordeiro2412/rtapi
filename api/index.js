const express = require('express');
const routes = require('./routes/index');
const http = require('http');
const cors = require('cors');
require("dotenv").config();
const morgan = require("morgan");
const path = require("path");
const bodyParser = require('body-parser');
//const passport = require('./middlewares/passport'); // Caminho do arquivo passport.js

const app = express();
const server = http.Server(app);


app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Ajuste o limite conforme necessário
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);
app.use(express.json());
//app.use(passport.initialize());

routes(app);

const port = 3000;

app.listen(port, () => {
    console.log('listening on port', port)
})

module.exports = app;