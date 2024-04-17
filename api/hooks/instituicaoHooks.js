const enviarEmail = require('../functions/sendMail')

// Função para hash da senha após salvar o usuário
async function enviarEmailSalvar(inst) {
    const destinatario = inst.email;
    const assunto = 'Boas vindas ao Schoob!';
    const conteudo = `Seja bem vindo (a), ${inst.nome}\n\nÉ um enorme prazer ter você no nosso time, juntos vamos revolucionar a forma de aprendizado e qualidade de ensino!\n\nAtenciosamente,\nEquipe do Aplicativo`;
    await enviarEmail(destinatario, assunto, conteudo);
}

module.exports = {
    enviarEmailSalvar
};