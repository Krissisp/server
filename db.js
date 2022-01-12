const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "3cc07b29d232404b8d3ce57dcfc9d129",
    host: "localhost",
    port: "5432",
    database: "serv_post"
});

module.exports = pool;