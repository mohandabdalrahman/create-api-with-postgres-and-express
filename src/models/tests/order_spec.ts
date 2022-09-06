import { Order, OrderStore } from '../order';
import { User, UserStore } from '../user';

const orderStore = new OrderStore();
const userStore = new UserStore();

describe('user model', () => {
  it('should have create method', () => {
    expect(userStore.create).toBeDefined();
  });

  it('create method should return new created user', async () => {
    const user: User = {
      firstName: 'mohand',
      lastName: 'abdalrahman',
      password: '123',
    };
    const result = await userStore.create(user);
    expect(result).toBeTruthy();
  });
});

describe('order model', () => {
  it('should have create method', () => {
    expect(orderStore.create).toBeDefined();
  });

  it('create method should return new created order', async () => {
    const order: Order = {
      user_id: 1,
      status: 'open',
    };
    const result = await orderStore.create(order);
    expect(result).toBeTruthy();
  });

  it('should have show method', () => {
    expect(orderStore.show).toBeDefined();
  });
  it('show method should return all orders of user', async () => {
    const user_id = 1;
    const result = await orderStore.show(user_id);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});
