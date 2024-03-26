-- Enable the pgcrypto extension to use UUID generation functions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE DATABASE todo_app;
\c todo_app;

-- Create todos table
CREATE TABLE todos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    progress INT CHECK (progress BETWEEN 0 AND 100),
    date TIMESTAMP
);
