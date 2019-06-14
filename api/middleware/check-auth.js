const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token;
    try{
        const decoded = jwt.verify(token, config.JWT_KEY);
        req.userData = decoded;
        next();
    }catch (e) {
        return res.status(401).json({
            message: 'Auth failed',
            status: 403
        });
    }
};