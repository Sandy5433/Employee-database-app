const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)  
);

const firstQues = [
    {
        type: 'checkbox',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View All Employees','Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    },
]

var values = []
console.table(['id', 'name'], values )
inquirer.prompt(firstQues)