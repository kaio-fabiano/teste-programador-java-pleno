CREATE TABLE client(
    id int8 NOT NULL,
    name VARCHAR (100),
    cpf VARCHAR (20) UNIQUE,
    phone VARCHAR (20),
    mail VARCHAR (50) UNIQUE,
    PRIMARY KEY (id)
);
