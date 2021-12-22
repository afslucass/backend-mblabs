const jwt = require("jsonwebtoken")

const check = async (req, res, next) => {
    try {
        
        if(!req.header('Authorization')) {
            res.status(401).json({ error: 'No token' })
            return
        }
        const [ bearer, token ] = req.header('Authorization').split(' ')
        if(bearer != 'Bearer') {
            res.status(401).json({ error: 'token malformated' })
            return
        }

        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.query.idByToken = decoded.id 
        next()
    } catch(err) {
        res.status(500).json(err)
    }
}

exports.AuthMiddleWare = {
    check,
}