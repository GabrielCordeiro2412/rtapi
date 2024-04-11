import { checkLicenseValidity } from '../utils/licenseUtils';

/**
 * Middleware de verificação de licença.
 * Verifica se a licença do usuário é válida antes de permitir o acesso a uma rota.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 * @param {Function} next - Função de próximo middleware.
 */
export async function licenseMiddleware(req, res, next) {
    const instId = req.instituicao._id; // Supondo que você tenha um objeto `user` armazenado na requisição com o ID do usuário logado
    
    try {
        const isLicenseValid = await checkLicenseValidity(instId);

        if (isLicenseValid) {
            // Se a licença for válida, passe para a próxima middleware ou rota
            next();
        } else {
            // Se a licença for inválida, retorne um erro de licença expirada
            res.status(401).json({ error: 'Licença expirada ou inválida.' });
        }
    } catch (error) {
        // Em caso de erro ao verificar a licença, retorne um erro interno do servidor
        console.error('Erro ao verificar a licença:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
