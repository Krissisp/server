const db = require('../db');
const Crypto = require('crypto-js');

const autentificationUserSchema = {
    nickname: {
        custom : {
            options: async function(nick) {
                const users = await db.query('SELECT name FROM users');
                const nickname = users.rows.filter((user) => user.name === nick);
                if(nickname.length === 0) {
                    throw ("This nickname was not found");
                }
            }
        }
    },
    password: { 
        custom : {
            options: async function(password) {
                const hashPasswordusers = await db.query('SELECT password FROM users');
                const passwordDB = hashPasswordusers.rows.filter((user) => Crypto.AES.decrypt(user.password, 'khbfmls,nbcjkdgl').toString(Crypto.enc.Utf8) === password);
                if(passwordDB.length === 0) {
                    throw ("Invalid password");
                }
            }
        }
    }
}

module.exports = autentificationUserSchema;