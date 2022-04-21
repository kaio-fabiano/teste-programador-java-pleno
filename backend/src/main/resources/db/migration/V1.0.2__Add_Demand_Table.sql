CREATE TABLE demand(
    id int8 NOT NULL,
    client_id int8 NOT NULL,
    date DATE NOT NULL,
    description text NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE CASCADE ON UPDATE CASCADE
);
