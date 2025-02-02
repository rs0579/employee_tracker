import inquirer from 'inquirer'; //THIS IMPORTED NPM PACKAGE ALLOWS ME TO USE INQUIERE

function mainMenu() {
    //**HERE IS WHERE I'D CREATE A DESTUCTURE {CHOICE} VARIABLE: CONST {CHOICE} = AWAIT INQUIRER... THEN WHERE I HAVE ANSWER I WOULD SLOT CHOICE */
    inquirer // THIE IS HOW YOU START THE PROMISE
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "choice",
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'Exit'],
                //YOU NEED TO FOLLOW THIS SYNTAX WHEN CREATING A LIST - DO NOT FORGET THE OPENING AND CLOSING CURLIES AFTER PROMPT([])
            },
        ])
        .then(async (answer) => {
            //THE ANSWER IS WHAT I AM EXPRECTING - I TRIED TO USE ANSWER.CHOICE BUT IT DIDN'T WORK BECAUSE THE NAME IS CHOICE. THEN I JUST TRIED CHOICE BUT EVENTUALLY I JUST FOLLOWED WHAT I DID IN THE VEHICLE BUILDER. **MAYBE IF I CREATE A VARIABLE WITH THE DESTRUCTURE CHOICE IT'L WORK AS INTENTED**
            switch (answer) {
                case 'view all departments':
                    await viewDepartments()
                    break
                case 'view all roles':
                    await viewRoles()
                    break
                case 'view all employees':
                    await viewEmployees()
                    break
                case 'add a department':
                    await addDepartment()
                    break
                case 'add a role':
                    await addRole()
                    break
                case 'add an employee':
                    await addEmployee()
                    break
                case 'add an employee role':
                    await addEmployeeRole()
                    break
                //I USED SWITCH HERE INSTEAD OF AN IF ELSE STATEMENT BECAUSE IT IS VERY LONG
            }
        }
        )
}
function addDepartment() {
    //the name of the department
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter department name.',
            name: 'deparmentName'
        },
        // {
        //     type: 'number',
        //     message: 'Enter department id.',
        //     name: 'departmentId'
        // },
    ])
}
function addRole() {
    inquirer.prompt([
        // the name, salary, and department for the role 
        {
            type: 'input',
            message: 'Enter role title',
            name: 'title'
        },
        {
            type: 'number',
            message: 'Enter employee salary.',
            name: 'salary'
        },
        {
            type: 'number',
            message: 'Enter role department.',
            name: 'roleDepartement'
        },
    ]).then((answer) => {
        //MAYBE HERE I USE THE PUSH METHOD AND DOT NOTATION ** ANSWERS.NAME.PUSH()
    })
}
function addEmployee() {
    inquirer.prompt([
        //employee’s first name, last name, role, and manager
        {
            type: 'input',
            message: 'Enter employee first name.',
            name: 'fistName'
        },
        {
            type: 'input',
            message: 'Enter employee last name.',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'Enter employee role',
            name: 'employeeRole'
        },
        {
            type:'input',
            message: 'Enter employee manager.',
            name: 'manager'
        }
    ])
        .then((answer) => {

        })

}
//WHAT I THINK I HAVE TI DO IS, IN THE FUNCTION, SELECT FROM A JOINED TABLE TO BE ABLE TO CREATE THE VIEW FUNCTIONS

function viewDepartments() {
    'SELECT * FROM departments'
}

function viewRoles() {
    'SELECT job title, role id, the department that role belongs to, and the salary for that role FROM...'
}

function viewEmployees() {
    'SELECT employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to FROM ... '



}
function addEmployeeRole() {
    //select an employee to update and their new role
    inquirer.prompt([
        {
            type: 'list',
            message: 'Select an employee.',
            name: 'options',
            choices: [``]

        }
    ])
}











mainMenu()