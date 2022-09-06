import supertest from 'supertest';
import { User } from '../../models/user';
import app from '../../server';

const request = supertest(app);

describe('Test users endpoint response', () => {
  let token = '';
  it('should return 201', async () => {
    const user: User = {
      firstName: 'mohand',
      lastName: 'abdalrahman',
      password: '123',
    };
    const response = await request.post('/users').send(user);
    token = response.body;
    expect(response.status).toBe(201);
  });
  it('should return 401 when token is missing', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(401);
  });
  it('should return 200', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('should return 401 when token is missing', async () => {
    const response = await request.get('/users/1');
    expect(response.status).toBe(401);
  });
  it('should return 200', async () => {
    const response = await request
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
