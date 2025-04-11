-- Create the 'Race' table
CREATE TABLE Race (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date TIMESTAMP NOT NULL,
  location VARCHAR(255) NOT NULL
);

-- Create the 'Result' table
CREATE TABLE Result (
  id SERIAL PRIMARY KEY,
  raceId INT NOT NULL,
  participant VARCHAR(255) NOT NULL,
  time INT NOT NULL, -- Time in seconds
  FOREIGN KEY (raceId) REFERENCES Race(id) ON DELETE CASCADE
);

