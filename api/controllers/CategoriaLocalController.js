// chatController.js
const Categoria = require('../models/CategoriaModel')
const Local = require('../models/LocalModel')
const CategoriaLocal = require('../models/CategoriaLocalModel')

class CategoriaLocalController {
    static async createCategoriaLocal(req, res) {
        const { categoriaid, localid } = req.headers;
        try {
            if (!categoriaid || !localid) {
                return res.status(400).send({ message: "Preencha todos os campos" })
            }

            const categoria = await Categoria.findById(categoriaid)
            const local = await Local.findById(localid)
            if (!categoria) {
                return res.status(400).send({ message: "Categoria não existe!" })
            }else if(!local){
                return res.status(400).send({ message: "Local não existe" })   
            }
            const catlocal = await CategoriaLocal.create({
                categoria: categoriaid,
                local: localid
            })

            return res.status(200).json(catlocal)
        } catch (error) {
            res.status(500).json(error)

        }
    }

    static async deleteCategoriaLocal(req, res) {
        const { catlocalid } = req.headers;

        try {
            await CategoriaLocal.findByIdAndDelete(catlocalid)

            res.status(200).json({ message: 'Categoria do Local deletada com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar categoria do local!' })
        }
    }
    static async todasCategoriasLocal(req, res) {
        try {
            const catlocais = CategoriaLocal.find()
            res.status(200).json(catlocais)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = CategoriaLocalController;
