CREATE TABLE IF NOT EXISTS business_owner(
    id serial PRIMARY KEY,
    contact_name varchar(25) NOT NULL,
    contact_email varchar(25) NOT NULL,
    password varchar(255) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS business (
    id serial PRIMARY KEY,
    business_name varchar(50) NOT NULL,
    contact_email varchar(25) NOT NULL,
    business_owner_id INT REFERENCES business_owner(id) NOT NULL,
    contact_telephone varchar(25) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS location (
    id serial PRIMARY KEY,
    address1 VARCHAR(50) NOT NULL,
    address2 VARCHAR(50),
    country VARCHAR(50),
    business_id INT REFERENCES business(id) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS block(
    id serial PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    location_id INT REFERENCES location(id) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS unit_type (
    id serial PRIMARY KEY,
    name varchar(25) NOT NULL,
    length INT NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS unit(
    id serial PRIMARY KEY,
    name varchar(25) NOT NULL,
    block_id INT REFERENCES block(id) NOT NULL,
    unit_type_id INT REFERENCES unit_type(id) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS customer(
    id serial PRIMARY KEY,
    contact_name varchar(25) NOT NULL,
    contact_email varchar(25) NOT NULL,
    password varchar(255) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS purchase_units (
    id serial PRIMARY KEY,
    customer_id INT REFERENCES customer(id) NOT NULL,
    unit_id INT REFERENCES unit(id) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);