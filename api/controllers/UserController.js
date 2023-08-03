const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { cpf } = require('cpf-cnpj-validator');
const authConfig = require('../config/auth.json');
const enviarEmail = require('../functions/sendMail')
const stripe = require('stripe')('sk_test_51Mw9XNBzmAAATyiFwz37GfPX2Mw8yGNCNl1X6xjTTA5gqhkXtaT0IMzmc1m9N4KV3RsiOwl1TaIDKWshZC7lwHOI00wtU8SOot');


function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })

}
class UserController {

    // Cria um novo usuário
    static async criarUsuario(req, res) {
        const { name, email, password, userCpf, dtNascimento, parentsControl, passwordParents } = req.body;
        const { instituicaoid, turmaid } = req.headers;

        try {
            const usuarioEmailExistente = await User.findOne({ email });
            if (usuarioEmailExistente) {
                return res.status(400).json({ error: 'Este e-mail já está cadastrado' });
            }

            // Valida o CPF
            if (!cpf.isValid(userCpf)) {
                return res.status(400).json({ error: 'CPF inválido' });
            }

            const novoUsuario = await User.create({
                name,
                email,
                password,
                cpf: userCpf,
                dtNascimento,
                parentsControl,
                passwordParents,
                instituicao: instituicaoid,
                turma: turmaid,
            });

            // Envia o email de boas-vindas
            const destinatario = email;
            const assunto = 'Bem-vindo ao nosso aplicativo!';
            const conteudo = `Olá ${name},\n\nBem-vindo ao nosso aplicativo! Esperamos que você aproveite sua experiência conosco.\n\nAtenciosamente,\nEquipe do Aplicativo`;

            await enviarEmail(destinatario, assunto, conteudo);

            return res.status(201).json(novoUsuario);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao criar o usuário' });
        }
    }

    //Login do usuario
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            // Busca o usuário pelo e-mail
            const usuario = await User.findOne({ email });

            // Verifica se o usuário foi encontrado
            if (!usuario) {
                return res.status(401).json({ error: 'E-mail ou senha inválidos' });
            }

            // Verifica se a senha fornecida coincide com a senha armazenada no banco de dados
            const senhaCorreta = await bcrypt.compare(password, usuario.password);
            if (!senhaCorreta) {
                return res.status(401).json({ error: 'E-mail ou senha inválidos' });
            }

            usuario.password = undefined;

            return res.status(200).json({ usuario, token: generateToken({ id: usuario.id }) });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao fazer login' });
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

        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: 'Acesso não autorizado' });
        }

        try {

            const decodedToken = jwt.verify(token, authConfig.secret);
            const userId = decodedToken.id;

            const usuario = await User.findById(userId);

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
            console.log(error)
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Token inválido' });
            }
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

    static async criarPlano(req, res) {
        stripe.products.create({
            name: 'Starter',
            description: 'R$5,00/mês',
        }).then(product => {
            stripe.prices.create({
                unit_amount: 5,
                currency: 'brl',
                recurring: {
                    interval: 'month',
                },
                product: product.id,
            }).then(price => {
                console.log('Success! Here is your starter subscription product id: ' + product.id);
                console.log('Success! Here is your premium subscription price id: ' + price.id);
            });
        });
    }
}

module.exports = UserController;
