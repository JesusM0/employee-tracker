// Retrieve Client
const mysql = require('mysql2');

// Connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Personabufu1899%', 
    database: 'employee_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the Employees Database.');
});

module.exports = connection;