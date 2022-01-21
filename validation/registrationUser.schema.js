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
        isStrongPassword: { 
            minLength: 8, 
            minLowercase: 1, 
            minUppercase: 1, 
            minNumbers: 1 
        }, 
        errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number", 
    }, 
}

module.exports = regitrationUserSchema;