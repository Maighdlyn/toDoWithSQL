DROP DATABASE IF EXISTS to_do_list;
CREATE DATABASE to_do_list;

\c to_do_list

DROP TABLE IF EXISTS to_do;

CREATE TABLE to_do (
  id SERIAL PRIMARY KEY,
  task TEXT,
  -- looks like this completed flag is not used
  completed BOOLEAN DEFAULT false
);

DROP DATABASE IF EXISTS to_do_list_test;
CREATE DATABASE to_do_list_test;

-- instead of repeating your schema for the test maybe pull in a common schema
-- file for both environments and specify the db name in the command
\c to_do_list_test

DROP TABLE IF EXISTS to_do;

CREATE TABLE to_do (
  id SERIAL PRIMARY KEY,
  task TEXT,
  completed BOOLEAN DEFAULT false
);
