const jwt = require('jsonwebtoken');
const config = require('../config');

const tokenAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const tokens = authHeader.split(' ');
        const jwtToken = tokens[1];
        const result = jwt.verify(jwtToken, config.jwtSecret);
        req.role = result.role;
        next();
    } catch (e) {
        res.status(401).send('Unauthorized');
    }
}

module.exports = tokenAuth;