import License from "../models/LicenseModel";
import { v4 as uuidv4 } from 'uuid';

/**
 * Gera uma nova licença para um usuário.
 * @param {string} instId - ID do usuário para quem a licença será gerada.
 * @returns {Promise<Object>} - Promise resolvida com a licença gerada.
 */
export async function generateLicense(instId) {
    try {
        const licenseKey = uuidv4(); // Gera um UUID único para a licença
        const expirationDate = new Date(); // Adiciona a data de expiração (por exemplo, 30 dias a partir de hoje)
        expirationDate.setDate(expirationDate.getDate() + 30);

        const license = new License({
            instId,
            licenseKey,
            expirationDate
        });

        await license.save();
        return license;
    } catch (error) {
        throw new Error(`Erro ao gerar a licença: ${error.message}`);
    }
}

/**
 * Verifica se uma licença é válida para o usuário.
 * @param {string} instId - ID do usuário para quem a licença será verificada.
 * @returns {Promise<boolean>} - Promise resolvida com um booleano indicando se a licença é válida.
 */
export async function checkLicenseValidity(instId) {
    try {
        const license = await License.findOne({ instId });

        if (!license) {
            return false; // Licença não encontrada para este usuário
        }

        if (license.expirationDate < new Date()) {
            return false; // Licença expirada
        }

        return true; // Licença válida
    } catch (error) {
        throw new Error(`Erro ao verificar a validade da licença: ${error.message}`);
    }
}
