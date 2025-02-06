import inquirer from 'inquirer'; //THIS IMPORTED NPM PACKAGE ALLOWS ME TO USE INQUIERE
import { pool, connectToDb } from './db/connection.js';

await connectToDb()

async function mainMenu() {
    //**HERE IS WHERE I'D CREATE A DESTUCTURE {CHOICE} VARIABLE: CONST {CHOICE} = AWAIT INQUIRER... THEN WHERE I HAVE ANSWER I WOULD SLOT CHOICE */
    inquirer // THIE IS HOW YOU START THE PROMISE
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "choice",
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'Exit']
                //YOU NEED TO FOLLOW THIS SYNTAX WHEN CREATING A LIST - DO NOT FORGET THE OPENING AND CLOSING CURLIES AFTER PROMPT([])
            },
        ])
        .then(async (answer) => {
            //THE ANSWER IS WHAT I AM EXPRECTING - I TRIED TO USE ANSWER.CHOICE BUT IT DIDN'T WORK BECAUSE THE NAME IS CHOICE. THEN I JUST TRIED CHOICE BUT EVENTUALLY I JUST FOLLOWED WHAT I DID IN THE VEHICLE BUILDER. **MAYBE IF I CREATE A VARIABLE WITH THE DESTRUCTURE CHOICE IT'L WORK AS INTENTED**
            switch (answer.choice) {
                case 'view all departments':
                    viewDepartments()
                    break
                case 'view all roles':
                    viewRoles()
                    break
                case 'view all employees':
                    viewEmployees()
                    break
                case 'add a department':
                    addDepartmentPrompt()
                    break
                case 'add a role':
                    addRolePrompt()
                    break
                case 'add an employee':
                    addEmployeePrompt()
                    break
                case 'add an employee role':
                    addEmployeeRole()
                    break
                case 'Exit':
                    break

                //I USED SWITCH HERE INSTEAD OF AN IF ELSE STATEMENT BECAUSE IT IS VERY LONG
            }
        })
}

const addDepartment = async (deparmentName: string, departmentId: number) => {
    const query = `INSERT INTO department (departmentId, departmentName) VALUES ($1, $2)`;
    const values = [departmentId, deparmentName]
    try {
        await pool.query(query, values)
    } catch (err) {
        console.error('Error adding employee', err);

    }
}
const addDepartmentPrompt = async () => {

    //the name of the department
    const answers = await inquirer.prompt([
        {
            type: 'number',
            message: 'Enter department id.',
            name: 'deparmentId'
        },
        {
            type: 'input',
            message: 'Enter department name.',
            name: 'deparmentName'
        },
    ])
    await addDepartment(answers.departmentId, answers.departmentName)

}
const addRole = async (title: string, salary: number, departmentName: string) => {
    const query = `INSERT INTO roles (title, salary, departmentName) VALUES ($1, $2, $3)`;
    const values = [title, salary, departmentName]
    try {
        await pool.query(query, values)
    } catch (err) {
        console.error('Error adding employee', err);
    }
}
const addRolePrompt = async () => {
    const answers = await inquirer.prompt([
        // the name, salary, and department for the role 
        {
            type: 'input',
            message: 'Enter role name',
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
            name: 'departmentName'
        },

    ])
    await addRole(answers.title, answers.salary, answers.departmentName)
}
const addEmployee = async (firstName: string, lastName: string, roleId: number, managerId: number) => {
    const query = `INSERT INTO employee (firstName, lastName, title, managerId) VALUES ($1, $2, $3, $4)`;
    const values = [firstName, lastName, roleId, managerId]
    try {
        await pool.query(query, values)
    } catch (err) {
        console.error('Error adding employee', err);

    }
}
const addEmployeePrompt = async () => {

    const answers = await inquirer.prompt([
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
            message: 'Enter employee role ID.',
            name: 'roleId'
        },
        {
            type: 'input',
            message: 'Enter employee manager.',
            name: 'managerId'
        }
    ])
    await addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId)
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
    console.log('Anything')
    pool.query('SELECT * FROM employee')
        // pool.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role, department.name AS department, roles.salary, manager.first_name  || manager.last_name AS manager
        // FROM employee
        // LEFT JOIN roles
        // ON employee.role_id = roles.id
        // LEFT JOIN department
        // ON roles.department_id = departement.id
        // LEFT JOIN employees manager
        // ON employee.manager_id = manager.id`
        //     // 'SELECT employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to FROM ... '
        // )
        .then(
            ({ rows }) => {
                console.table(rows);


            }
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