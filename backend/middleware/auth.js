const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ message: 'Not access token' });
    }

    try {
        const user = jwt.verify(token, secret);
        req.user = user;
        next();
    } catch {
        res.status(401).json({ message: 'Failed to authenticate token.' });
    }
}