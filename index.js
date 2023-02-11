const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const fs = require('fs');
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
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View All Employees','Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    },
]

const addDepartmentQues = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'Please enter the name of the department',
    }
]
function printDepartment(){
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
      });
}

// var values = []
// console.table(['id', 'name'], values )

function addEmployee(){
    console.log('employee added')
};

function addDepartment(){
    inquirer.prompt(addDepartmentQues)
    .then(answer => {
        const newDepartment = answer.departmentName;
        db.query('INSERT INTO department (name) VALUES (newDepartment)', function (err, results) {
            console.log(results);
          });
        })
};

function addRole(){
    console.log('role added')
};

function startingQuestion() {
    inquirer.prompt(firstQues)
    .then(answer => {
        if (answer.action === 'View All Employees') {
            console.log('hello!')
        } else if (answer.action === 'Add Employee') {
            addEmployee()
        } else if (answer.action === 'Update Employee Role') {
            console.log('hello!')
        } else if (answer.action === 'View All Roles') {
            console.log('hello!')
        } else if (answer.action === 'Add Role') {
            addRole()
        } else if (answer.action === 'View All Departments') {
            printDepartment()
        } else if (answer.action === 'Add Department'){
            addDepartment()
        } else if (answer.action === 'Quit') {
            console.log('bye')
        }
    })
}

startingQuestion();
