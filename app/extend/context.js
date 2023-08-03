'use strict'
const bcrypt = require('bcrypt')
module.exports = {
    async hashPassword(password, saltRounds = 10, hashLength = 60) {
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(password, salt)
        return hash.slice(0, hashLength)
    },

    async verifyPassword(password, hash) {
        const storedHashLength = hash.length
        const fullHash = await bcrypt.hash(password, hash.slice(0, 29)) // 29 是因为 bcrypt 默认的盐值长度是 29 位
        const result = fullHash.slice(0, storedHashLength) === hash
        return result
    }
}
