const {checkLicenseValidity} = require('../utils/licenseUtils')

module.exports = async (req, res, next) => {
    const instId = req.headers.instid ? req.headers.instid : req.params.instid;
    console.log(instId)
    
    try {
        const isLicenseValid = await checkLicenseValidity(instId);

        if (isLicenseValid) {
            next();
        } else {
            res.status(401).json({ error: 'Licença expirada ou inválida.' });
        }
    } catch (error) {
        console.error('Erro ao verificar a licença:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
