DROP DATABASE IF EXISTS business_db;

CREATE DATABASE business_db;


\c business_db;

CREATE TABLE department (
id SERIAL PRIMARY KEY,
name VARCHAR(30) UNIQUE NOT NULL 
);

CREATE TABLE role (

id SERIAL PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INTEGER,
FOREIGN KEY (department_id) REFERENCES department(id)
 ); 

CREATE TABLE employee (
id SERIAL PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER NULL,
manager_id INTEGER NULL,
FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (manager_id) REFERENCES employee(id)
);