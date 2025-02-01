import inquirer from 'inquirer'; //THIS IMPORTED NPM PACKAGE ALLOWS ME TO USE INQUIERE

mainMenu() {
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
        .then((answer) => {
//THE ANSWER IS WHAT I AM EXPRECTING - I TRIED TO USE ANSWER.CHOICE BUT IT DIDN'T WORK BECAUSE THE NAME IS CHOICE. THEN I JUST TRIED CHOICE BUT EVENTUALLY I JUST FOLLOWED WHAT I DID IN THE VEHICLE BUILDER. 
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
                case 'add a employee':
                    await addEmployee()
                    break
                case 'add a employee role':
                    await addEmployeeRole()
                    break
                    //I USED SWITCH HERE INSTEAD OF AN IF ELSE STATEMENT BECAUSE IT IS VERY LONG
            }
        }
        )
}