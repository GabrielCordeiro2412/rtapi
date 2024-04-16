const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    try {
        if (!authHeader)
            throw new Error('No token provided');

        const parts = authHeader.split(' ');

        if (!parts.length === 2)
            throw new Error('Token error');

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme))
            throw new Error('Token malformatted');

        const decoded = await jwt.verify(token, authConfig.secret);

        if (!decoded.id)
            throw new Error('Invalid token');

        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};
