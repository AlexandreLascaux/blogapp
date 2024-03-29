const jsonToken = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decodedToken = jsonToken.verify(token, 'jesuissecret');
        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            throw 'pas bon ID'
        } else {
            next();
        }
    } catch {
        console.log('auth ', req.headers.authorization)
        res.status(401).json({
            error: new Error('request pas valid')
        })
    }
}