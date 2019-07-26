const jwt = require('jsonwebtoken');
const SECRET_KEY = 'chuoibaomatnaodo';

async function sign(obj){
    return new Promise((resolve, reject)=>{
        jwt.sign(obj, SECRET_KEY, { expiresIn: '2 days' }, (error, token)=>{
            if(error) return reject('Can not sign token!')
            return resolve(token)
        })
    })
}
async function verify(token){
    return new Promise((resolve, reject)=>{
        jwt.verify(token, SECRET_KEY, (err, decoded)=>{
            if(err) return reject(err.message)
            delete decoded.iat
            delete decoded.exp
            return resolve(decoded)
        })
    })
}
module.exports = { sign, verify }