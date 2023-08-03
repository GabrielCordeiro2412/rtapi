const nodemailer = require('nodemailer');

async function enviarEmail(destinatario, assunto, conteudo) {
    // Configuração do transporte de email
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com', // Substitua pelo host SMTP do seu provedor de email
        port: 587, // Substitua pela porta do seu provedor de email (normalmente 587 ou 465 para SSL)
        secure: false, // Defina como true para usar SSL (por exemplo, para Gmail)
        auth: {
            user: 'grodriguescordeiro@hotmail.com', // Substitua pelo seu email de envio
            pass: 'gabriel241203', // Substitua pela sua senha de email
        },
    });

    // Definição do email
    const mailOptions = {
        from: 'grodriguescordeiro@hotmail.com', // Substitua pelo seu email de envio
        to: destinatario,
        subject: assunto,
        text: conteudo, // Conteúdo em texto plano
        // html: '<p>Conteúdo em HTML</p>', // Você também pode enviar conteúdo em HTML
    };

    try {
        // Envio do email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado:', info.messageId);
        return info;
    } catch (error) {
        console.error('Erro ao enviar o email:', error);
        throw error;
    }
}

module.exports = enviarEmail;