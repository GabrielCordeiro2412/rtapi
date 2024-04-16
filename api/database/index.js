const mongoose = require('mongoose');

const connectWithRetry = () => {
    console.log('Tentando conectar ao MongoDB...');
    mongoose.connect('mongodb://localhost:27017/schoob', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexão bem-sucedida com o MongoDB.');
    })
    .catch((err) => {
        console.error('Erro ao conectar com o MongoDB:', err.message);
        console.log('Tentando novamente em 5 segundos...');
        setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

mongoose.Promise = global.Promise;

module.exports = mongoose;