--  to view all employees: including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

SELECT employee.first_name, employee.last_name, roles.title AS title, roles.salary, department.department_name
FROM employee, roles, department

--  view all departments: department names and department ids
SELECT * FROM department

-- view all roles: THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
SELECT roles.title AS title, roles.id, roles.department_id, roles.salary
FROM roles