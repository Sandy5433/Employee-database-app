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
        return this.db.query("INSERT INTO employee SET ?", value)
    }
    viewEmployee(){
        return this.db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;")
    }
    updateEmployee(){
        return this.db.query("UPDATE employee SET role_id = ? WHERE id = ? ", value)
    }
  
}

module.exports = new Db(db)

