-- Active: 1665699068175@@127.0.0.1@3306@crud
/*CRIANDO BANCO DE DADOS*/
create database crud
default character set utf8
default collate utf8_general_ci;

//Criando a tabela de DB
CREATE TABLE usuario (id int not null auto_increment, primary key(id), name varchar(90), idade int(3));




