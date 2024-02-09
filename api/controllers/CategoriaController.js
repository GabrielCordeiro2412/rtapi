// chatController.js
const uploadImage = require('../functions/uploadImage');
const Categoria = require('../models/CategoriaModel')

class CategoriaController {
    static async createCategoria(req, res) {
        const { nome, img_url} = req.body;
        try {
            if (!nome) {
                return res.status(400).send({ message: "Preencha o nome da categoria" })
            }

            let uploaded = null;
            if (img_url) {
                uploaded = await uploadImage(img_url, 'schoob-locals');
            }

            const cat = await Categoria.create({
                nome,
                img_url: uploaded ? `https://schoob-locals.s3.sa-east-1.amazonaws.com/${uploaded}.jpeg` : null,
                img_name: uploaded ? `${uploaded}.jpeg` : null,
            })

            return res.status(200).json(cat)
        } catch (error) {
            res.status(500).json(error)

        }
    }

    static async deleteCategoria(req, res) {
        const { categoriaid } = req.headers;

        try {
            await Categoria.findByIdAndDelete(categoriaid)

            res.status(200).json({ message: 'Categoria deletada com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar categoria!' })
        }
    }
    static async todasCategorias(req, res) {
        try {
            const categorias = Categoria.find()
            res.status(200).json(categorias)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = CategoriaController;
