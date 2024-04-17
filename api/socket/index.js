// index.js
const chatSocket = require('./chatSocket');

module.exports = function(io) {
    chatSocket(io);
};
