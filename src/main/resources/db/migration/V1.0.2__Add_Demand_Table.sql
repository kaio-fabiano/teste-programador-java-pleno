CREATE TABLE demand(
    id int8 NOT NULL,
    client_id int8 NOT NULL,
    date date NOT NULL,
    description text NOT NULL,
    primary key (id),
    foreign key (client_id) references client(id) on delete cascade
);
