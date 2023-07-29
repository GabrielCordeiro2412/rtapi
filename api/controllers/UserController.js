const User = require('../models/UserModel');

class UserController {
    // Cria um novo usuário
    static async criarUsuario(req, res) {
        const { name, email, password, cpf, dtNascimento, parentsControl, passwordParents } = req.body;
        const { instituicaoid, turmaid } = req.headers;

        try {
            //Verificação se o usuário for menor de idade para ter o controle dos pais -- DESABILITADA
            // const dataAtual = new Date();
            // const dataNascimento = new Date(dtNascimento);
            // const diffAnos = dataAtual.getFullYear() - dataNascimento.getFullYear();
            // const diffMeses = dataAtual.getMonth() - dataNascimento.getMonth();
            // const diffDias = dataAtual.getDate() - dataNascimento.getDate();
            // const idade = diffMeses < 0 || (diffMeses === 0 && diffDias < 0) ? diffAnos - 1 : diffAnos;

            // let isMenor = false;
            // if (idade < 18) {
            //     isMenor = true;
            // }

            const novoUsuario = await User.create({
                name,
                email,
                password,
                cpf,
                dtNascimento,
                parentsControl,
                passwordParents,
                instituicao: instituicaoid,
                turma: turmaid,
            });

            return res.status(201).json(novoUsuario);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar o usuário' });
        }
    }

    // Lista todos os usuários
    static async listarTodosUsuarios(req, res) {
        try {
            const usuarios = await User.find().populate('instituicao turma');

            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar os usuários' });
        }
    }

    // Obtém um usuário pelo ID
    static async obterUsuarioPorId(req, res) {
        const { usuarioId } = req.params;

        try {
            const usuario = await User.findById(usuarioId).populate('instituicao turma');

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao obter o usuário' });
        }
    }

    // Atualiza um usuário pelo ID
    static async atualizarUsuario(req, res) {
        const { usuarioId } = req.params;
        const { name, email, cpf, dtNascimento, parentsControl, passwordParents } = req.body;
        const { instituicaoid, turmaid } = req.headers;
        //caso o usuário passe um atributo com o nome diferente n está exibindo mensgem de erro: "nome"

        try {
            const usuario = await User.findById(usuarioId);

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            const updates = {};
            if (name) updates.name = name;
            if (email) updates.email = email;
            if (cpf) updates.cpf = cpf;
            if (dtNascimento) updates.dtNascimento = dtNascimento;
            if (parentsControl !== undefined) updates.parentsControl = parentsControl;
            if (passwordParents) updates.passwordParents = passwordParents;
            if (instituicaoid) updates.instituicao = instituicaoid;
            if (turmaid) updates.turma = turmaid;

            const usuarioAtualizado = await User.findByIdAndUpdate(usuarioId, { $set: updates }, { new: true }).populate('instituicao turma');

            return res.status(200).json(usuarioAtualizado);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar o usuário' });
        }
    }

    // Exclui um usuário pelo ID
    static async deletarUsuario(req, res) {
        const { usuarioId } = req.params;

        try {
            const usuario = await User.findByIdAndDelete(usuarioId).populate('instituicao turma');

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            return res.status(200).json({ message: 'Usuário excluído com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir o usuário' });
        }
    }
}

module.exports = UserController;
