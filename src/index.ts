import inquirer from 'inquirer'; //THIS IMPORTED NPM PACKAGE ALLOWS ME TO USE INQUIERE
import { pool, connectToDb } from './db/connection';

await connectToDb()

async function mainMenu() {
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
                case 'Exit':
                    break

                //I USED SWITCH HERE INSTEAD OF AN IF ELSE STATEMENT BECAUSE IT IS VERY LONG
            }
        })
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
        //     ]).then((answer) => {
        //         //MAYBE HERE I USE THE PUSH METHOD AND DOT NOTATION ** ANSWERS.NAME.PUSH()
    ])
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
            type: 'input',
            message: 'Enter employee manager.',
            name: 'manager'
        }
    ])
    // .then((answer) => {

    // })

}
//WHAT I THINK I HAVE TI DO IS, IN THE FUNCTION, SELECT FROM A JOINED TABLE TO BE ABLE TO CREATE THE VIEW FUNCTIONS

function viewDepartments() {
    pool.query('SELECT * FROM department')
}

function viewRoles() {
    pool.query(`SELECT roles.id, roles.title, roles.salary, departments.name AS department 
    FROM roles
    JOIN departments
    ON roles.department_id = departments.id`
        // 'SELECT job title, role id, the department that role belongs to, and the salary for that role FROM...'
    )
}

function viewEmployees() {

    pool.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role, department.name AS department, roles.salary, manager.first_name || ' ' || manager.last_name AS manager
    FROM employee
    LEFT JOIN roles
    ON employee.role_id = roles.id
    LEFT JOIN department
    ON roles.department_id = departement.id
    LEFT JOIN employees manager
    ON employee.manager_id = manager.id`
        // 'SELECT employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to FROM ... '
    )
}
const addEmployeeRole = async () => {
    //select an employee to update and their new role
    const { employeeId, newRoleId } = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: 'Enter employee ID:'
            },
            {
                type: 'input',
                name: 'newRoleId',
                message: 'Enter new role ID:'
            }
        ]);
    await pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
    //THE ABOVE IS LIKE USING A TEMPLATE LITERAL IN THAT THE $1 AND 2 ARE EMPTY SLOTS THAT WILL BE FILLED BY newROLEID AND employeeID. IDK IF WE WERE SUPPOSED TO USE THIS IN THIS ASSIGNMENT.
}











mainMenu()