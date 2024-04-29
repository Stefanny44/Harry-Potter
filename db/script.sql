CREATE DATABASE ativback01;

\c ativback01

CREATE TABLE usuarios (
id SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
datanascimento DATE NOT NULL,
idade INTEGER,
signo VARCHAR(20));

\d


SELECT * FROM usuarios;