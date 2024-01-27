// chatController.js
const Local = require('../models/LocalModel')
const authConfig = require('../config/auth.json');
const axios = require('axios')


class LocalController {
    static async criarLocal(req, res) {
        const { nome, endereco, descricao } = req.body;

        try {
            if (!nome || !endereco || !descricao) {
                return res.status(400).json({ mensagem: 'Por favor, forneça valores válidos para nome, endereço e descricão.' });
            }

            const apiKey = 'AIzaSyAw28gvWecLpNLX6yemoYlqZvWb5argHcs';
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&key=${apiKey}`);

            const { lat, lng } = response.data.results[0].geometry.location;

            const local = await Local.create({
                nome,
                endereco,
                descricao,
                latitude: lat,
                longitude: lng,
            })

            res.status(201).send(local);

        } catch (error) {
            return res.status(500).send({ message: "Não foi possivel criar o local" })
        }
    }

    static async buscarLocais(req, res) {
        try {
            const locals = await Local.find()
            return res.status(200).json(locals)
        } catch (error) {
            return res.json(error)
        }
    }

    static async deleteLocal(req, res) {
        const { localid } = req.headers;

        try {
            await Local.findByIdAndDelete(localid)

            res.status(200).json({ message: 'Local deleteado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar local!' })
        }
    }
}

module.exports = LocalController;