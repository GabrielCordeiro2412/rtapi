// chatController.js
const Local = require('../models/LocalModel')
const authConfig = require('../config/auth.json');
const axios = require('axios');
const uploadImage = require('../functions/uploadImage');
const AWS = require('aws-sdk')

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;


class LocalController {
    static async criarLocal(req, res) {
        const { nome, endereco, descricao, img_url } = req.body;

        try {
            if (!nome || !endereco || !descricao) {
                return res.status(400).json({ mensagem: 'Por favor, forneça valores válidos para nome, endereço e descricão.' });
            }

            const apiKey = 'AIzaSyDYPf0XBddJAjeLAEEC3n7hkL-JiD8rkMU';
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&key=${apiKey}`);
            const { lat, lng } = response.data.results[0].geometry.location;

            let uploaded = null;
            if (img_url) {
                uploaded = await uploadImage(img_url, 'schoob-locals');
            }

            const local = await Local.create({
                nome,
                endereco,
                descricao,
                latitude: lat,
                longitude: lng,
                img_url: uploaded ? `https://schoob-locals.s3.sa-east-1.amazonaws.com/${uploaded}.jpeg` : null,
                img_name: uploaded ? `${uploaded}.jpeg` : null,
            });

            res.status(201).send(local);

        } catch (error) {
            return res.status(500).send(error);
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
        const { localid } = req.params;

        try {
            const local = await Local.findById(localid)
            if (local) {
                if (local.img_name !== null) {
                    const s3 = new AWS.S3({
                        accessKeyId: AWS_ACCESS_KEY_ID,
                        secretAccessKey: AWS_SECRET_ACCESS_KEY,
                    });

                    s3.deleteObject({
                        Bucket: 'schoob-locals',
                        Key: local.img_name
                    }, function (err, data) { })
                }
            }
            await Local.findByIdAndDelete(localid)

            res.status(200).json({ message: 'Local deleteado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar local!' })
        }
    }
}

module.exports = LocalController;