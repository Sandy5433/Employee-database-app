const mysql = require("mysql2");
const {prompt} = require("inquirer");
const cTable = require("console.table");
const fs = require("fs");
const db = require("./db/department");

loadSelector();
async function loadSelector() {
    console.log('first log')
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
        // {
        //   name: "Add Role",
        //   value: "ADD_ROLE",
        // },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        // {
        //   name: "Add Employee",
        //   value: "ADD_EMPLOYEE",
        // },
        // {
        //   name: "Update Employee Role",
        //   value: "UPDATE_EMPLOYEE",
        // },
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
  console.log('second log')
  console.log(choice)
  switch (choice) {
    case "INSERT_DEPARTMENT":
      return insertDepartment();
    case "VIEW_DEPARTMENT":
      return showDepartment();
    // case "ADD_ROLE":
    //     return insertRole();
    case "VIEW_ROLES":
        return showRole();
    //case "ADD_EMPLOYEE":
    //  return insertEmployee();
    case "VIEW_EMPLOYEES":
        return showEmployee();

    default:
    console.log('third log')
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
  console.log(department) //{name: 'Service'}
  await db.addDepartment(department);
  console.log(`added ${department.name} to the database`);
  loadSelector();
}
async function showDepartment() {
  const department = await db.viewDepartment();
  console.log("Here are all departments");
  console.table(department);

  loadSelector();
}
// async function insertRole() {
//     const 
//     const role = await prompt([
//       {
//         name: "title",
//         message: "What is the name of the role?",
//       },
//       {
//         name: "salary",
//         message: "What is the salary of the role?",
//       },
//       {
//         name: "department_id",
//         message: "Which department does the role belong to?",
//         choices: []
//       },
//     ]);
//     await db.addRole(role);
//     console.log(`added ${role.name} to the database`);
//     loadSelector();
//   }

async function showRole() {
    const role = await db.viewRole();
    console.log("Here are all roles");
    console.table(role);
  
    loadSelector();
  }

async function showEmployee() {
    const employee = await db.viewEmployee();
    console.log("Here are all employees");
    console.table(employee);
  
    loadSelector();
  }
  
function quit(){
    console.log('Application ended')
    process.exit()
}



// const firstQues = [
//   {
//     type: "list",
//     name: "action",
//     message: "What would you like to do?",
//     choices: [
//       "View All Employees",
//       "Add Employee",
//       "Update Employee Role",
//       "View All Roles",
//       "Add Role",
//       "View All Departments",
//       "Add Department",
//       "Quit",
//     ],
//   },
// ];

// const addDepartmentQues = [
//   {
//     type: "input",
//     name: "departmentName",
//     message: "Please enter the name of the department",
//   },
// ];
// function printDepartment() {
//   db.query("SELECT * FROM department", function (err, results) {
//     console.log(results);
//   });
// }

// // var values = []
// // console.table(['id', 'name'], values )

// function addEmployee() {
//   console.log("employee added");
// }

// function addDepartment() {
//   inquirer.prompt(addDepartmentQues).then((answer) => {
//     const newDepartment = answer.departmentName;
//     db.query(
//       "INSERT INTO department (name) VALUES (newDepartment)",
//       function (err, results) {
//         console.log(results);
//       }
//     );
//   });
// }

// function addRole() {
//   console.log("role added");
// }

// function startingQuestion() {
//   inquirer.prompt(firstQues).then((answer) => {
//     console.log(answer);
//     if (answer.action === "View All Employees") {
//       console.log("hello!");
//     } else if (answer.action === "Add Employee") {
//       addEmployee();
//     } else if (answer.action === "Update Employee Role") {
//       console.log("hello!");
//     } else if (answer.action === "View All Roles") {
//       console.log("hello!");
//     } else if (answer.action === "Add Role") {
//       addRole();
//     } else if (answer.action === "View All Departments") {
//       printDepartment();
//     } else if (answer.action === "Add Department") {
//       addDepartment();
//     } else if (answer.action === "Quit") {
//       console.log("bye");
//     }
//   });
// }

// // startingQuestion();
