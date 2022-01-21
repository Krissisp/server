CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE weatherInCity (
    id SERIAL PRIMARY KEY,
    city VARCHAR(255),
    dt bigint,
    datestr VARCHAR(255),
    time VARCHAR(255),
    temperature numeric,
    feels_like numeric,
    humidity smallint,
    clouds smallint,
    speed_wind numeric,
    description VARCHAR(255)
);