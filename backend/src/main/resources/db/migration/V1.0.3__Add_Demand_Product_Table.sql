CREATE TABLE demand_product(
    id serial NOT NULL,
    demand_id int8 NOT NULL,
    product_id int8 NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (demand_id) REFERENCES demand(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE
);
