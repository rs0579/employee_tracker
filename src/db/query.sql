--  to view all employees: including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

-- SELECT employee.first_name, employee.last_name, roles.title AS title, roles.salary, department.department_name
-- FROM employee, roles, department

--  view all departments: department names and department ids
-- SELECT * FROM department

-- view all roles: THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
SELECT role.id, role.title AS job title, role.salary AS salary, department.name AS department
FROM role
JOIN department ON role.department_id = department.id

-- WHEN I choose to add a role
-- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

SELECT role.title AS role name, role.salary, department.name AS department
FROM role
Join department ON role.department_id = department.id