-- CREATE TYPE status AS ENUM ('open', 'closed');
CREATE TABLE Orders (id SERIAL PRIMARY KEY, user_id int REFERENCES users(id),order_status status);