const db = require('./configure');
class Db {
    constructor(db){
        this.db = db
    }
    addDepartment(value){
        return this.db.query("INSERT INTO department SET ?", value)
    }
    viewDepartment(){
        return this.db.query("SELECT * FROM department")
    }
    addRole(value){
        return this.db.query("INSERT INTO role SET ?", value)
    }
    viewRole(){
        return this.db.query("SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Department FROM role JOIN department ON role.department_id = department.id")
    }
    addEmployee(value){
        return console.log('hi')
    }
    viewEmployee(){
        return this.db.query("SELECT * FROM employee SELECT role.salary JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id")
    }
    updateEmployee(){
        return console.log('hi')
    }
}



module.exports = new Db(db)

