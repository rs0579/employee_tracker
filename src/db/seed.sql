INSERT INTO department (department_name)
VALUES ('Sales'),
('Finance'),
('Engineering'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES ('Lawyer', 153500 4),
('Legal Team Lead', 255360, 4),
('Salesperson', 75633, 1),
('Software Engineer', 164941, 3),
('Lead Engineer', 513820, 3),
('Accountant', 85000, 2),
('Account Manager', 978500, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bernadette', 'Washington', 1, 'Devonte Brown')
('Ebony', 'Jenkins', 4,'Andre Martin')
('Devonte','Brown', 2, null)
('Andre','Martin', 5, null)
('Alexus','Freeman', 7, null)
('Quintin','Jeffers', 6,'Alexus Freeman')
('Michael', 'Scott', 3, null);
