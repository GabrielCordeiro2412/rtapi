const User = require('../models/UserModel');
const Post = require('../models/PostModel');
const Instituicao = require('../models/InstituicaoModel');



class PostController{

    static async criarPost(req, res) {
        const { text, user, instituicao, turma } = req.body;
        console.log(req.body)
        try {

            const userFind = await User.findById(user);

            if(!userFind){
                return res.status(404).json({ error: 'User não encontrado' });
            }

            const instFind = await Instituicao.findById(instituicao)

            if(!instFind){
                return res.status(404).json({ error: 'Instituição não encontrada' });
            }

            const novoPost = await Post.create({ text, userFind, user, instituicao, turma });

            return res.status(201).json(novoPost);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar o post' });
        }
    }

    static async listarTodosPosts(req, res) {
        try {
            const posts = await Post.find();

            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar os posts' });
        }
    }

    static async listarTodosPostsPorInst(req, res) {
        const {instid} = req.params;
        try {
            const posts = await Post.find({instituicao: instid}).populate('user turma instituicao');

            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar os posts' });
        }
    }

    static async obterPostPorId(req, res) {
        const { postId } = req.params;

        try {
            const post = await Post.findById(postId);

            if (!post) {
                return res.status(404).json({ error: 'Post não encontrado' });
            }

            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao obter o post' });
        }
    }

    static async atualizarPost(req, res) {
        const { postId } = req.params;
        const { text, user, instituicao, turma } = req.body;

        try {
            const post = await Post.findByIdAndUpdate(
                postId,
                { text, user, instituicao, turma },
                { new: true }
            );

            if (!post) {
                return res.status(404).json({ error: 'Post não encontrado' });
            }

            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar o post' });
        }
    }

    static async deletarPost(req, res) {
        const { postId } = req.params;

        try {
            const post = await Post.findByIdAndDelete(postId);

            if (!post) {
                return res.status(404).json({ error: 'Post não encontrado' });
            }

            return res.status(200).json({ message: 'Post excluído com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir o post' });
        }
    }
}

module.exports = PostController;