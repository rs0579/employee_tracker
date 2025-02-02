DROP DATABASE IF EXISTS business_db;

CREATE DATABASE business_db;

\c business_db;

CREATE TABLE department (
    id: SERIAL PRIMARY KEY,
    department_name: VARCHAR(30), NOT NULL 
);

CREATE TABLE roles (
    id: SERIAL PRIMARY KEY,
    title: VARCHAR(30),
    salary: DECIMAL NOT NULL,
    department_id: INTEGER,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id: SERIAL PRIMARY KEY,
    first_name: VARCHAR(30),
    last_name: VARCHAR(30),
    role_id: INTEGER,
    manager_id: INTEGER --THIS IS REFERRING TO THE MANAGERS THAT ARE BEING MENTIONED IN THE ROLE TABLE.
    FOREIGN KEY (role_id)
    REFERENCES role(id)
);