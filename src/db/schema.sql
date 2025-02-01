DROP DATABASE IF EXISTS business_db;

CREATE DATABASE business_db;

\c business_db;

CREATE TABLE department (
    id: SERIAL PRIMARY KEY,
    name: VARCHAR(30), NOT NULL 
);

CREATE TABLE role (
    id: SERIAL PRIMARY KEY,
    title: VARCHAR(30),
    salary: 
);

CREATE TABLE employee ();