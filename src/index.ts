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
                    process.exit()
                //I USED SWITCH HERE INSTEAD OF AN IF ELSE STATEMENT BECAUSE IT IS VERY LONG
            }


        })
}
async function viewDepartments() {
    const results = await pool.query('SELECT * FROM department')
    console.table(results.rows)
    mainMenu()
}
async function viewRoles() {
    const results = await pool.query(`SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    JOIN department 
    ON department.id = role.department_id`
    )
    console.table(results.rows)
    mainMenu()
}
const viewEmployees = async () => {
    const results = await pool.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title AS Title, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id`)
    console.table(results.rows)

    mainMenu()
}



const addDepartment = async (departmentId: number, departmentName: string) => {
    const query = `INSERT INTO department (id, name) VALUES ($1, $2)`;
    const values = [departmentId, departmentName]
    try {
        const results = await pool.query(query, values)
        console.table(results.rowCount)
    } catch (err) {
        console.error('Error adding employee', err);

    }
    mainMenu()
}
const addDepartmentPrompt = async () => {

    //the name of the department
    const answers = await inquirer.prompt([
        {
            type: 'number',
            message: 'Enter department id.',
            name: 'departmentId'
        },
        {
            type: 'input',
            message: 'Enter department name.',
            name: 'departmentName'
        },
    ])
    await addDepartment(answers.departmentId, answers.departmentName)
    mainMenu()
    //CHECK OVER THIS ONE, YOU MAY NEED TO INSERT QUERY AND VALUES
}
const addRole = async (title: string, salary: number, departmentName: string) => {
    const query = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, (SELECT id FROM department WHERE name = $3))`;
    const values = [title, salary, departmentName]
    try {
        const results = await pool.query(query, values)
        console.table(results.rowCount)
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
            type: 'list',
            message: 'Enter department name.',
            name: 'departmentName',
            choices: ['Sales', 'Legal', 'Finance', 'Engineering']
        },

    ])
    await addRole(answers.title, answers.salary, answers.departmentName)
    mainMenu()
}
//WHAT I THINK I HAVE TI DO IS, IN THE FUNCTION, SELECT FROM A JOINED TABLE TO BE ABLE TO CREATE THE VIEW FUNCTIONS







const addEmployee = async (id: number, firstName: string, lastName: string, roleId: number, managerId: number) => {
    const query = `INSERT INTO employee (id, first_name, last_name, title, manager_id) VALUES ($1, $2, $3, $4, $5)`;
    const values = [id, firstName, lastName, roleId, managerId]
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
            type: 'number',
            message: 'Enter employee manager.',
            name: 'managerId'
        }
    ])
    await addEmployee(answers.id, answers.firstName, answers.lastName, answers.roleId, answers.managerId)
}










const addEmployeeRole = async () => {
    //select an employee to update and their new role
    const { employeeId, newRoleId } = await inquirer
        .prompt([
            {
                type: 'number',
                name: 'employeeId',
                message: 'Enter employee ID:'
            },
            {
                type: 'number',
                name: 'newRoleId',
                message: 'Enter new role ID:'
            }
        ]);
    const sql = `UPDATE employee SET role_id = $1 WHERE id = $2`
    await pool.query(sql, [newRoleId, employeeId]);
    //THE ABOVE IS LIKE USING A TEMPLATE LITERAL IN THAT THE $1 AND 2 ARE EMPTY SLOTS THAT WILL BE FILLED BY newROLEID AND employeeID. IDK IF WE WERE SUPPOSED TO USE THIS IN THIS ASSIGNMENT.
}

// const sql = `UPDATE employee SET role_id = $1 WHERE id = $2`










mainMenu()









// .then(async (answer) => {
//     //THE ANSWER IS WHAT I AM EXPRECTING - I TRIED TO USE ANSWER.CHOICE BUT IT DIDN'T WORK BECAUSE THE NAME IS CHOICE. THEN I JUST TRIED CHOICE BUT EVENTUALLY I JUST FOLLOWED WHAT I DID IN THE VEHICLE BUILDER. **MAYBE IF I CREATE A VARIABLE WITH THE DESTRUCTURE CHOICE IT'L WORK AS INTENTED**
//     do {
// if (answer.choice === 'view all departments') {
//     viewDepartments()
// } else if (answer.choice === 'view all roles') {
//     viewRoles()
// } else if (answer.choice === 'view all employees') {
//     viewEmployees()
// } else if (answer.choice === 'add a department') {
//     addDepartmentPrompt()
// } else if (answer.choice === 'add a role') {
//     addRolePrompt()
// } else if (answer.choice === 'add an employee') {
//     addEmployeePrompt()
// } else if (answer.choice === 'add an employee role') {
//     addEmployeeRole()
// } else (answer.choice === 'Exit')

//             }
//             while (answer.choice !== 'Exit')
//         }
//         )
// }
