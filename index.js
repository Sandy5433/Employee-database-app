const mysql = require("mysql2");
const {prompt} = require("inquirer");
const cTable = require("console.table");
const fs = require("fs");
const db = require("./db/department");

loadSelector();
async function loadSelector() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "Add Department",
          value: "INSERT_DEPARTMENT",
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENT",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE",
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "Quit",
          value: "QUIT",
        }
      ]
    },
  ]);
  // console.log(choice) returns a stringe e.g. 'ADD_ROLE'
  switch (choice) {
    case "INSERT_DEPARTMENT":
      return insertDepartment();
    case "VIEW_DEPARTMENT":
      return showDepartment();
    case "ADD_ROLE":
        return insertRole();
    case "VIEW_ROLES":
        return showRole();
    case "ADD_EMPLOYEE":
     return insertEmployee();
    case "VIEW_EMPLOYEES":
        return showEmployee();
    case "UPDATE_EMPLOYEE":
        return updateEmployeeRole();

    default:
      return quit();
  }
}

async function insertDepartment() {
  const department = await prompt([
    {
      name: "name",
      message: "What is the name of the department?",
    },
  ]);
  // console.log(department) returns an object. e.g. {name: 'Service'}
  await db.addDepartment(department);
  console.log(`added ${department.name} to the database`);
  loadSelector();
}
async function showDepartment() {
  const department = await db.viewDepartment();
  console.log("Here are all the departments");
  console.table(department);

  loadSelector();
}
async function insertRole() {
    var departmentArr = await db.viewDepartment()
    const choicesArr = departmentArr.map(({ id, name }) => ({
      name: name,
      value: id
    }));
    const role = await prompt([
      {
        name: "title",
        message: "What is the name of the role?",
      },
      {
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        choices: choicesArr
      },
    ]);
    await db.addRole(role);
    console.log(`added ${role.title} to the database`);
    loadSelector();
  }

async function showRole() {
    const role = await db.viewRole();
    console.log("Here are all the roles");
    // console.log(role); returns an Object with 4 properties: ID, Title, Salary, Department
    console.table(role);
  
    loadSelector();
  }

async function insertEmployee() {
    var roleArr = await db.viewRole()
    const trimmedRole = roleArr.map(({ID, Title}) => ({
      name: Title,
      value: ID
    }));
    var empArr = await db.viewEmployee()
    const trimmedEmp = empArr.map((manager) => ({
      name: manager.first_name + ' ' + manager.last_name,
      value: manager.id
    }));
    // console.log(trimmedRole); returns an array of objects with 2 properties, name and value
    const employee = await prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's role?",
        choices: trimmedRole
      },
      {
        type: "list",
        name: "manager_id",
        message: "Who is the employee's manager?",
        choices: trimmedEmp
      },
    ]);
  
    await db.addEmployee(employee);
    console.log(`Added ${employee.first_name} ${employee.last_name} to the database`);
    loadSelector();
  }

async function showEmployee() {
    const employee = await db.viewEmployee();
    console.log("Here are all the employees");
    console.table(employee);
    loadSelector();
  }
 
async function updateEmployeeRole() {
  var empArr = await db.viewEmployee();
  const fullNameArr = empArr.map((staff) => ({
    name: staff.first_name + ' ' + staff.last_name,
    value: staff.id
  }))
  const roles = await db.viewRole();
  const roleArr = roles.map((title) => ({
    name: title.Title,
    value: title.ID
  }))
    const updateRole = await prompt([
      {
        type: "list",
        name: "id",
        message: "Which employee's role do you want to update?",
        choices: fullNameArr
      },
      {
        type: "list",
        name: "role_id",
        message: "Which role do you want to assign the selected employee?",
        choices: roleArr
      },
    ]);
    // console.log(updateRole) returns an object with 2 properties, id and role_id
    await db.updateEmployee([updateRole.role_id, updateRole.id]);
   
    loadSelector();
  }  
  
function quit(){
    console.log('Application ended')
    process.exit()
}
