CREATE TABLE demand_product(
    id serial NOT NULL,
    demand_id int8 NOT NULL,
    product_id int8 NOT NULL,
    primary key (id),
    foreign key (demand_id) references demand(id) on delete cascade,
    foreign key (product_id) references product(id) on delete cascade
);
