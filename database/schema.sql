CREATE DATABASE to_do_list;

\c to_do_list

DROP TABLE IF EXISTS to_do;

CREATE TABLE to_do (
  id SERIAL PRIMARY KEY,
  task TEXT,
  completed BOOLEAN DEFAULT false
);
