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
function addDepartment(){
    inquirer.prompt([
        {
            type: 'number',
            message: 'Enter department id.',
            name: 'departmentId'
        },
        {
            type: 'input',
            message: 'Enter department name.',
            name: 'deparmentName'
        },
    ])
}
function addRole(){
    inquirer.prompt([{
        type: 'number',
        message: 'enter role id.',
        name: 'roleId'
    },
    {
        type: 'input',
        message: 'Enter employee title',
        name: 'title'
    },
    {
        type: 'number',
        message: 'Enter employee salary.',
        name: 'salary'
    },
    {
        type: 'number',
        message: 'Enter department id.',
        name: 'departmentId'
    },
])
}
function addEmployee() {
    inquirer.prompt([
        {
            type: 'number',
            message: 'Enter employee id.',
            name: 'employeeId'
        },
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
            type: "list", 
            message: "Select a manager:", 
            name: "managerId", 
            choices: [...managers.map((m: any) => ({ name: m.name, value: m.id })), { name: "None", value: null }]
        }
    ])

}











mainMenu()