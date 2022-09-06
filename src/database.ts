import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();
const {
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  ENV,
} = process.env;

console.log('ENV=>', ENV);
const client = new Pool({
  host: POSTGRES_HOST,
  database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
