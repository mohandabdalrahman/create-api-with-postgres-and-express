import supertest from 'supertest';
import { Product } from '../../models/product';
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

describe('Test products endpoint response', () => {
  it('should return 200', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('should return 200 ', async () => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });
  it('should return 401 when token is missing', async () => {
    const response = await request.post('/products');
    expect(response.status).toBe(401);
  });
  it('should return 201', async () => {
    const product: Product = {
      name: 'test',
      price: 100,
    };
    const response = await request
      .post('/products')
      .send(product)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
  });
  it('should return 200', async () => {
    const response = await request
      .get('/products/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('should return 401 when token is missing', async () => {
    const response = await request.post('/orders/1/products');
    expect(response.status).toBe(401);
  });
});
