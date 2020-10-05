const connection = require('./connection.js');

class Employee {
    constructor(connection){
        this.connection = connection
    }
    viewDepartList() {
        return this.connection.promise().query(
            "SELECT department.department_id, department.name FROM department;"
        )
    }
    viewEmployeeRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.department_id;"
        )
    }
    viewEmployeeList() {
        return this.connection.promise().query(
            "SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.department_id;"
        )
    }  
}

module.exports = new Employee(connection);