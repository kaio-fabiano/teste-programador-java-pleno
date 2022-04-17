CREATE TABLE client(
    id int8 NOT NULL,
    name varchar(100),
    cpf varchar(20) UNIQUE,
    phone varchar (20),
    mail varchar (50) UNIQUE,
    primary key (id)
);
