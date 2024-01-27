// chatController.js
const Categoria = require('../models/CategoriaModel')

class CategoriaController {
    static async createCategoria(req, res) {
        const { nome } = req.body;
        try {
            if (!nome) {
                return res.status(400).send({ message: "Preencha o nome da categoria" })
            }
            const cat = await Categoria.create({
                nome
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
