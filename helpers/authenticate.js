const { verify } = require('./jwt');

function authenticate(req, res, next){
    const token = req.headers.token
    if(!token){
        return res.send({
            code: 0,
            data: null,
            message: 'Can not find token'
        })
    }
    verify(token)
    .then(decoded=>{
        req.userId = decoded._id
        next();
    })
    .catch(()=>{
        res.send({
            code: 0,
            data: null,
            message: 'Invalid token!'
        })
    })
}
module.exports = { authenticate }