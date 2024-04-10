const Tarefa = require('../models/TarefaModel')

class TarefaController {
    static async createTarefa(req, res) {
        try {
            const tarefa = await Tarefa.create(req.body);
            res.status(201).json(tarefa);
        } catch (err) {
            res.status(400).json(err);
        }
    }
    static async getTarefas(req, res) {
        try {
            const tarefas = await Tarefa.find();
            res.status(201).json(tarefas);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    static async getTarefaById(req, res) {
        try {
            const tarefa = await Tarefa.findById(req.params.id);
            if (!tarefa) {
                return res.status(404).json({ success: false, error: 'Tarefa not found' });
            }
            res.status(200).json(tarefa);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    static async updateTarefa(req, res) {
        try {
            const tarefa = await Tarefa.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!tarefa) {
                return res.status(404).json({ success: false, error: 'Tarefa not found' });
            }
            res.status(200).json(tarefa);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    static async deleteTarefa(req, res) {
        try {
            const tarefa = await Tarefa.findByIdAndDelete(req.params.id);
            if (!tarefa) {
                return res.status(404).json({ success: false, error: 'Tarefa not found' });
            }
            res.status(200).json({ success: true, data: {} });
        } catch (err) {
            res.status(400).json(err);
        }
    }

    static async updateUserComplete(req, res) {
        try {
            const tarefa = await Tarefa.findById(req.params.id);
            if (!tarefa) {
                return res.status(404).json({ success: false, error: 'Tarefa not found' });
            }
            const userConcluido = tarefa.usersConcluidos.find(user => user.aluno.toString() === req.body.aluno.toString());
            if (userConcluido) {
                return res.status(400).json({ success: false, message: 'User already completed this tarefa' });
            }

            // Adiciona o aluno à lista de usuários que concluíram a tarefa
            tarefa.usersConcluidos.push({ aluno: req.body.userid, nota: req.body.nota });

            res.status(200).json(tarefa)
            await tarefa.save();
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

module.exports = TarefaController;
