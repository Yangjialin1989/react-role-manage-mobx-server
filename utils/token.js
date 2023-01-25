const jwt = require('jsonwebtoken')
const singKey = 'mes_qdhd_mobile_xhykjyxgs'    // 这里可以自己设置

exports.setToken = (paload,exp) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign(
            {
                paload,
            },
            singKey,
            {
                //expiresIn: 60 * 60, 1h
                expiresIn: exp,
                algorithm: 'HS256'
            }
        )
        resolve(token)
    })
}

exports.verToken = (token) => {
    return new Promise((resolve, reject) => {


        let info = jwt.verify(token.split(' ')[1], singKey)
        resolve(info)
    })
}

exports.singKey = singKey