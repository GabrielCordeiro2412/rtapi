const express = require('express');
const cors = require('cors');
const morgan = require("morgan");
const routes = require('./routes/index');
const http = require('http');
const socketIo = require('socket.io');

const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const server = http.Server(app);

const socketConfig = require('./socket/index');
const io = socketIo(server);

require("dotenv").config();
require('./cronjobs/index')

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);
app.use(express.json());

routes(app);

socketConfig(io);

const port = 3000;
const host = '0.0.0.0'

app.listen(port,host)

module.exports = app;