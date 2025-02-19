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
                case 'update an employee role':
                    updateEmployeeRole()
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

const addDepartment = async (departmentName: string) => {
    const query = `INSERT INTO department (name) VALUES ($1)`;
    const values = [departmentName]
    try {
        const results = await pool.query(query, values)
        console.table(results.rowCount)
    } catch (err) {
        console.error('Error adding employee', err);

    }

}

const addDepartmentPrompt = async () => {

    //the name of the department
    const answers = await inquirer.prompt([

        {
            type: 'input',
            message: 'Enter department name.',
            name: 'departmentName'
        },
    ])
    await addDepartment(answers.departmentName)
    console.log(`Added ${answers.departmentName} to the database.`)

    mainMenu()
    //CHECK OVER THIS ONE, YOU MAY NEED TO INSERT QUERY AND VALUES
}

const addRole = async (title: string, salary: number, departmentName: string) => {
    const query = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, (SELECT id FROM department WHERE name = $3))`;
    const values = [title, salary, departmentName]
    try {
        const results = await pool.query(query, values)
        console.log(results.rowCount)
    } catch (err) {
        console.error('Error adding employee', err);
    }
}
const addRolePrompt = async () => {
    const department = await pool.query(`SELECT * FROM department`)

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
            choices: department.rows.map((d: { name: string; id: any; }) => ({ name: d.name, value: d.id }))
        },

    ])
    await addRole(answers.title, answers.salary, answers.departmentName)
    console.log(`Added ${answers.title} to the database.`)

    mainMenu()

}
//WHAT I THINK I HAVE TI DO IS, IN THE FUNCTION, SELECT FROM A JOINED TABLE TO BE ABLE TO CREATE THE VIEW FUNCTIONS

const addEmployee = async (firstName: string, lastName: string, roleId: number, managerId: number | null) => {
    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
    const values = [firstName, lastName, roleId, managerId];

    try {
        await pool.query(query, values);
        console.log(`Added ${firstName} ${lastName} to the database.`);
    } catch (err) {
        console.error('Error adding employee:', err);
    }
}
const addEmployeePrompt = async () => {
    try {
        const [employees, roles] = await Promise.all([
            pool.query('SELECT * FROM employee'),
            pool.query('SELECT * FROM role')
        ]);

        const answers = await inquirer.prompt([
            {
                type: 'input',
                message: 'Enter employee first name:',
                name: 'firstName' // Fixed typo here
            },
            {
                type: 'input',
                message: 'Enter employee last name:',
                name: 'lastName'
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'Select role:',
                choices: roles.rows.map((r: { title: string; id: number }) => ({ name: r.title, value: r.id }))
            },
            {
                type: 'list',
                name: 'managerId',
                message: 'Select manager:',
                choices: [
                    ...employees.rows.map((e: { first_name: string; last_name: string; id: number }) => ({ name: `${e.first_name} ${e.last_name}`, value: e.id })),
                    { name: 'N/A', value: null }
                ]
            }
        ]);

        // Log manager's name if applicable
        if (answers.managerId) {
            const managerQuery = `SELECT first_name, last_name FROM employee WHERE id = $1`;
            const managerResult = await pool.query(managerQuery, [answers.managerId]);
            if (managerResult.rows.length > 0) {
                const { first_name: managerFirstName, last_name: managerLastName } = managerResult.rows[0];
                console.log(`Employee "${answers.firstName} ${answers.lastName}" added! Manager: ${managerFirstName} ${managerLastName}`);
            }
        }

        await addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId);

    } catch (err) {
        console.error('Error in addEmployeePrompt:', err);
    }
    
    mainMenu()
}




const updateEmployeeRole = async () => {
    console.log('updateEmployeeRole');
    
    //select an employee to update and their new role
    const employees = await pool.query('SELECT * FROM employee;');
    const roles = await pool.query('SELECT * FROM role;')
    try {
        const { employeeName, newRole } = await inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employeeName ',
                    message: 'Choose employee that you want to update:',
                    choices: employees.rows.map((e: { first_name: any; last_name: any; id: any; }) => ({ name: `${e.first_name} ${e.last_name}`, value: e.id })),
                },
                {
                    type: 'list',
                    name: 'newRole',
                    message: 'Update employee role:',
                    choices: roles.rows.map((r: { title: any; id: any; }) => ({ name: r.title, value: r.id }))
                }
            ])
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2;', [employeeName, newRole])
        console.log('Employee role updated successfully!')

    } catch (err) {
        console.error('Error updating employee role:', err)
    }
    mainMenu()
}


mainMenu()