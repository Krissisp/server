const db = require('../db');

const regitrationUserSchema = {
    nickname: {
        notEmpty: true, 
        errorMessage: "Nickname field cannot be empty",
        custom : {
            options: async function(nick) {
                const users = await db.query('SELECT name FROM users');
                const errorName = users.rows.filter((user) => user.name === nick);
                if(errorName.length > 0) {
                    throw ("This nickname already exists");
                }
            }
        }
    },
    password: { 
        isLength: {
            options: {min: 8},
        },
        errorMessage: "Password must be greater than 8", 
    }, 
}

module.exports = regitrationUserSchema;