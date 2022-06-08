CREATE TABLE IF NOT EXISTS animals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64),
    type VARCHAR(64)
);

INSERT INTO animals (name, type) VALUES ('rabbit', 'mammals'), ('owl', 'bird'), ('salmon', 'fish');