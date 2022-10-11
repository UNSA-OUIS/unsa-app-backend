const jwt = require('jsonwebtoken');


// ==================================
// Verificar Token
// ==================================


let verifyToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify( token, process.env.TOKEN_SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }
        req.user = decode.user;
        next();
    })
}

let verifyStudentRole = (req, res, next) => {
    let user = req.user;

    if (user.is_student) {
        next();
    } else {
        res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es estudiante'
            }
        })
    }
}

module.exports = { verifyToken, verifyStudentRole };