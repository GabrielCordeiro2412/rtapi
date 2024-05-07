const Anotacao = require('../models/AnotacaoModel')
const User = require('../models/UserModel')

class AnotacaoController {
    static async saveAnotacao(req, res) {
        const { texto, dataLimite } = req.body;
        const {userid} = req.headers;
        console.log(texto, userid)
        try {
            const user = await User.findById(userid)
            if(!user) return res.status(404).send({message: "Usuário não encontrado"})

            const anotacao = await Anotacao.create({
                texto,
                user: userid,
                dataLimite: dataLimite
            });

            res.status(201).send(anotacao);
        } catch (error) {
            return res.send(error)
        }
    }

    static async editAnotacao(req, res) {
        const { texto, dataLimite } = req.body;
        const {userid, anotacaoid} = req.headers;
        try {
            const user = await User.findById(userid)
            if(!user) return res.status(404).send({message: "Usuário não encontrado"})

            const anotacao = await Anotacao.findByIdAndUpdate(anotacaoid, {texto: texto, dataLimite: dataLimite})

            res.status(201).send(anotacao);
        } catch (error) {
            return res.send(error)
        }
    }

    static async deleteAnotacao(req, res) {
        const { anotacaoid } = req.headers;

        try {
            const anotacao = await Anotacao.findById(anotacaoid)
            if (anotacao) {
                await Anotacao.findByIdAndDelete(anotacaoid);
            }

            res.status(200).json({ message: 'Anotação deletada com sucesso' });
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async allAnotacoes(req, res){
        try {
            const anotacoes = await Anotacao.find()
            return res.json(anotacoes)
        } catch (error) {
            return res.status(500).send({message: "Erro ao buscar anotações"})
        }
    }

    static async anotacoesPorAluno(req, res){
        const { userid } = req.params
        try {
            const user = await User.findById(userid)
            if(!user) return res.status(404).send({message: "Usuário não encontrado"})

            const anotacoes = await Anotacao.find({user: userid})
            return res.json(anotacoes)

        } catch (error) {
            return res.status(500).send({message: "Erro ao buscar anotações"})
        }
    }
}

module.exports = AnotacaoController;
