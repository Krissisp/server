const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "kitn8332",
    host: "localhost",
    port: "5432",
    database: "postgres"
});

module.exports = pool;