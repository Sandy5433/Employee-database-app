const mysql = require('mysql2');
const util = require('util');

//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '06Feb2023',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)  
);

db.connect();
db.query = util.promisify(db.query)

module.exports = db