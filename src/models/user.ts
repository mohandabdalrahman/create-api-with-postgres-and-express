import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Client from '../database';
dotenv.config();
export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};
export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get users.Error:${error}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user ${id}. Error:${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2,$3)  RETURNING *';
      const hashPassword = bcrypt.hashSync(
        user.password,
        +process.env.SALT_ROUND!
      );
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        hashPassword,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not add user. Error:${error}`);
    }
  }
}
