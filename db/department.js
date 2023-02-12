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
}
module.exports = new Db(db)

