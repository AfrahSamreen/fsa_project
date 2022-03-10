function authenticate(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).send('unauthorized');
        return;
    }
    const tokens = req.headers.authorization.split(' ');
    const encodedStr = tokens[1];
    const buffer = Buffer.from(encodedStr, 'Base64');
    const decodedStr = buffer.toString();
    const credentials = decodedStr.split(':');
    const username = credentials[0];
    const password = credentials[1];

    if (username === 'admin' && password === 'password') next();
    else res.status(401).send('unauthorized');
}

module.exports = authenticate;