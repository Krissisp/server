const Crypto = require('crypto-js');

async function crypto(password) {
    const ciphertext = Crypto.AES.encrypt(`${password}`, 'khbfmls,nbcjkdgl').toString();
    return Promise.resolve(ciphertext);
}

module.exports = { crypto };