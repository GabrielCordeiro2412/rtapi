const License = require("../models/LicenseModel");
const { v4: uuidv4 } = require('uuid');

async function generateLicense(instId, planoId) {
    try {
        console.log(instId, planoId)
        const licenseKey = uuidv4(); // Gera um UUID único para a licença
        const expirationDate = new Date(); // Adiciona a data de expiração (por exemplo, 30 dias a partir de hoje)
        expirationDate.setDate(expirationDate.getDate() + 30);

        const license = new License({
            instituicao: instId,
            plano: planoId,
            licenseKey: licenseKey,
            expirationDate: expirationDate,
            active: true
        });

        await license.save();
        return license;
    } catch (error) {
        throw new Error(`Erro ao gerar a licença: ${error.message}`);
    }
}

async function checkLicenseValidity(instId) {
    console.log(instId)
    try {
        const license = await License.findOne({ instituicao: instId, active: true });

        if (!license) {
            return false;
        }

        if (license.expirationDate < new Date()) {
            return false;
        }

        return true;
    } catch (error) {
        throw new Error(`Erro ao verificar a validade da licença: ${error.message}`);
    }
}

module.exports = { generateLicense, checkLicenseValidity };
