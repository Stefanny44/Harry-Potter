CREATE DATABASE harrypotter;

\c harrypotter

CREATE TABLE bruxo (
id SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
idade INTEGER NOT NULL,
casa_hogwarts VARCHAR(20) NOT NULL,
habilidade_especial VARCHAR(50) NOT NULL,
status_sangue VARCHAR(30) NOT NULL,
patrono VARCHAR(40) NOT NULL);

\d


SELECT * FROM bruxo;



CREATE TABLE varinha (
id SERIAL PRIMARY KEY,
material VARCHAR(100) NOT NULL,
comprimento VARCHAR(20) NOT NULL,
nucleo VARCHAR(50) NOT NULL,
data_fabricacao DATE NOT NULL);

\d

SELECT * FROM varinha ;