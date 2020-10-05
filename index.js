const inquirer = require('inquirer');
const db = require('./db/database');
const { connection } = require('./db/connection');
const cTable = require('console.table');

function trackerQuestions() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'start',
            message: 'Choose An Option From The Given Choices.',
            choices: ['View Departments', 'View Employee Roles', 'View List of Employees', 'Add a Department', 'Add Employee Role', 'Add New Employee', 'Update Employee Role', 'Quit']
        }
    ])
        .then(choice => {
            //Maybe Use Cases instead of Ifs here??
            switch (choice.start) {
                case 'View Departments':
                    departmentList();
                    break;
                case 'View Employee Roles':
                    employeeRoles();
                    break;
                case 'View List of Employees':
                    employeeList();
                    break;
                case 'Add a Department':
                    addDepartment();
                    break;
                case 'Add Employee Role':
                    addRole();
                    break;
                case 'Add New Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployee
                    break;
                case 'Quit':
                    break;
                    //Seemed to have worked stil?? Check one last time before committing
            }
        })
};

function departmentList() {
    db.viewDepartList()
        .then(([rows]) => {
            console.table(rows)
        })
        .then(() => trackerQuestions())
};

function employeeRoles() {
    db.viewEmployeeRoles()
        .then(([rows]) => {
            console.table(rows)
        })
        .then(() => trackerQuestions())
};

function employeeList() {
    db.viewEmployeeList()
        .then(([rows]) => {
            console.table(rows)
        })
        .then(() => trackerQuestions())
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Enter The Name of The New Department.',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Department Name Required.');
                    return false
                }
            }
        }
    ])
        .then(({ newDepartment }) => {
            const query = connection.query(
                'INSERT INTO department SET ?',
                {
                    name: newDepartment
                },
                function (err, res) {
                    if (err) throw err;
                    // console.table(depname)
                }
            )
        })
        .then(() => departmentList())
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter New Role.',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Role Name Required.');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter Salary For Newly Added Role.',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Role Salary Required.');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'departId',
            message: 'Enter Department ID.',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Department ID Required.');
                    return false
                }
            }
        }
    ])
        .then(({ title, salary, departId }) => {
            const query = connection.query(
                'INSERT INTO role SET ?',
                {
                    title: title,
                    salary: salary,
                    department_id: departId
                },
                function (err, res) {
                    if (err) throw err;
                }
            )
        })
        .then(() => employeeRoles())
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstname',
            message: 'Enter First Name.',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('First Name Required.');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'lastname',
            message: 'Enter Last Name.',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Last Name Required.');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter Role ID.',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Role ID Required.');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter Manager ID.',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Manager ID Required.');
                    return false
                }
            }
        }
    ])
        .then(({ firstname, lastname, roleId, managerId }) => {
            const query = connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: firstname,
                    last_name: lastname,
                    role_id: roleId,
                    manager_id: managerId
                },
                function (err, res) {
                    if (err) throw err;
                }
            )
        })
        .then(() => employeeList())
}

function employeeUpdate() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeList',
            message: 'Enter Employee ID To Be Updated.',
        }, 
        {
            type: 'input',
            name: 'newRole',
            message: 'Enter ID of New Role.'
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

    }) .then (() => employeeList()) 

}
trackerQuestions();
