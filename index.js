const db = require('./db/database');
const inquirer = require('inquirer');
const connection = require('./db/connection');


function trackerQuestions() {}
inquirer.prompt([
    {
        type: 'list',
        name: 'start',
        message: 'Choose An Option Below.',
        choices: ['View Departments', 'View Roles', 'View Employees',
        'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
    }

])
.then((choice) => {
    switch (choice.start) {
        case "View Departments":
            viewDepartment(); 
            break;
        case "View Roles":
            viewRole();
            break;
        case "View Employees":
            viewEmployee();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Add Role":
            addRole();
            break;
        case "Add Employee": 
            addEmployee();
            break;
        case "Update Employee Role":
            updateEmployeeRole();
            break;
    }   

})

viewDepartment = function() {
    db.showDepartments()
    .then(([rows]) =>  {
       console.table(rows)
    })
    .then(() => trackerQuestions())
}; 

viewRole = function() {
    db.showEmployeesRoles()
    .then(([rows]) =>  {
       console.table(rows)
    })
    .then(() => trackerQuestions())
}; 
viewEmployee = function() {
    db.showEmployeesList()
    .then(([rows]) =>  {
       console.table(rows)
    })
    .then(() => trackerQuestions())
};


 
addDepartment = function(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment', 
            message: 'Enter New Department Name.'
        }
    ])
    .then(({newDepartment}) => {
        const query = connection.query(
            'INSERT INTO department SET ?',
            {
                name: newDepartment
            },
            function (err, res) {
                if(err) throw err;
            }
        )
    })
    .then(()=> viewDepartment())
}
addRole = function(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'role', 
            message: 'Enter Name of New Role.'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter Salary For New Role'
        },
        {
            type: 'input',
            name: 'departID',
            message: 'Enter Department ID'

        }
    ]) 
    .then(({role, salary, departID}) =>{
        const query = connection.query(
            'INSERT INTO role SET ?',
            {
                title: role,
                salary: salary,
                department_id: departID
            },
            function(err, res) {
                if (err) throw err;
            }
        )
    })
    .then(() => viewRole())
};

addEmployee = function() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter Employees First Name.'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter Employees Last Name.'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter Employees Role ID.'
        }
    ]) 
    .then (({firstName, lastName, roleId}) => {
        const query = connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: firstName,
                last_name: lastName,
                role_id: roleId
            }
        )
    })
    .then (() => viewEmployee())
};

updateEmployeeRole = function(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeList',
            message: 'Enter Employee ID To Be Updated.',
        }, 
        {
            type: 'input',
            name: 'newRole',
            message: 'Enter New Role ID For Employee'
        },
    ]) .then (({newRole, employeeList}) => {
        'UPDATE employee SET ? WHERE  ?', 
        [
            {
                role_id: newRole
            },
            {
                id: employeeList
            }
        ]

    }) .then (() => viewEmployee()) 

}
trackerQuestions();