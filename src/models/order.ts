import Client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: 'open' | 'closed';
};
export class OrderStore {
  async create(order: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO orders(user_id,order_status) VALUES($1,$2) RETURNING *';
      const result = await conn.query(sql, [order.user_id, order.status]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not add order. Error: ${error}`);
    }
  }

  async show(userId: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not find order. Error: ${error}`);
    }
  }

  async addProduct(quantity: number, orderId: number, productId: number) {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO order_items (quantity,order_id,product_id) VALUES($1,$2,$3) RETURNING *';
      const result = await conn.query(sql, [quantity, orderId, productId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not add product ${productId} to this order ${orderId}. Error: ${error}`
      );
    }
  }
}
