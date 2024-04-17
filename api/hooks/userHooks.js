const enviarEmail = require('../functions/sendMail')

// Função para hash da senha após salvar o usuário
async function enviarEmailSalvar(user) {
    const destinatario = user.email;
    const assunto = 'Boas vindas ao Schoob!';
    const conteudo = `Olá ${user.nome},\n\nBem-vindo ao nosso aplicativo! Seu cadastro foi confirmado e estamos aguardando a confirmação da sua instituição de ensino, você será avisado por e-mail assim que foi liberado.\n\nAtenciosamente,\nEquipe do Aplicativo`;
    await enviarEmail(destinatario, assunto, conteudo);
}

module.exports = {
    enviarEmailSalvar
};