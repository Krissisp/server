const db = require('../db');

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
                const users = await db.query('SELECT password FROM users');
                const passwordDB = users.rows.filter((user) => user.password === password);
                if(passwordDB.length === 0) {
                    throw ("Invalid password");
                }
            }
        }
    }
}

module.exports = autentificationUserSchema;