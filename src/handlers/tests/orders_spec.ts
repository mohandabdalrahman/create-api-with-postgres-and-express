import supertest from 'supertest';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import app from '../../server';

const request = supertest(app);
let token = '';
describe('Test users endpoint response', () => {
  it('should return 201', async () => {
    const user: User = {
      firstName: 'ahmed',
      lastName: 'abdalrahman',
      password: '123',
    };
    const response = await request.post('/users').send(user);
    token = response.body;
    expect(response.status).toBe(201);
  });
});

describe('Test orders endpoint response', () => {
  it('should return 401 when token is missing', async () => {
    const response = await request.post('/orders');
    expect(response.status).toBe(401);
  });
  it('should return 201', async () => {
    const order: Order = {
      user_id: 1,
      status: 'open',
    };
    const response = await request
      .post('/orders')
      .send(order)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
  });
  it('should return 401 when token is missing', async () => {
    const response = await request.get('/orders/users/1');
    expect(response.status).toBe(401);
  });
  it('should return 200', async () => {
    const response = await request
      .get('/orders/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
