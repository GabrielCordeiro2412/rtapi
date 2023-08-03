const Pergunta = require('../models/PerguntaModel');

class PerguntaController {
    // Cria uma nova pergunta
    static async criarPergunta(req, res) {
        const { texto } = req.body;
        const { instituicaoid } = req.headers;

        try {
            const novaPergunta = await Pergunta.create({
                texto,
                instituicao: instituicaoid,
            });

            return res.status(201).json(novaPergunta);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar a pergunta' });
        }
    }

    // Lista todas as perguntas de uma instituição
    static async listarPerguntas(req, res) {
        const { instituicaoid } = req.headers;

        try {
            const perguntas = await Pergunta.find({ instituicao: instituicaoid });

            return res.status(200).json(perguntas);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar as perguntas' });
        }
    }

    // Atualiza uma pergunta pelo ID
    static async atualizarPergunta(req, res) {
        const { perguntaId } = req.params;
        const { texto } = req.body;
        const { instituicaoid } = req.headers;

        try {
            const pergunta = await Pergunta.findById(perguntaId);

            if (!pergunta) {
                return res.status(404).json({ error: 'Pergunta não encontrada' });
            }

            if (pergunta.instituicao.toString() !== instituicaoid) {
                return res.status(403).json({ error: 'Acesso não autorizado' });
            }

            pergunta.texto = texto;
            await pergunta.save();

            return res.status(200).json(pergunta);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar a pergunta' });
        }
    }

    // Exclui uma pergunta pelo ID
    static async excluirPergunta(req, res) {
        const { perguntaId } = req.params;
        const { instituicaoid } = req.headers;

        try {
            const pergunta = await Pergunta.findById(perguntaId);

            if (!pergunta) {
                return res.status(404).json({ error: 'Pergunta não encontrada' });
            }

            if (pergunta.instituicao.toString() !== instituicaoid) {
                return res.status(403).json({ error: 'Acesso não autorizado' });
            }

            await Pergunta.findByIdAndDelete(perguntaId);

            return res.status(200).json({ message: 'Pergunta excluída com sucesso' });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao excluir a pergunta' });
        }
    }

    static async listarPerguntaPorId(req, res) {
        const { perguntaId } = req.params;

        try {
            const pergunta = await Pergunta.findById(perguntaId);

            if (!pergunta) {
                return res.status(404).json({ error: 'Pergunta não encontrada' });
            }

            return res.status(200).json(pergunta);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao obter a pergunta' });
        }
    }
}

module.exports = PerguntaController;
