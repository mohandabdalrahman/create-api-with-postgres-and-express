import { User, UserStore } from '../user';

const store = new UserStore();

describe('user model', () => {
  it('should have index method', () => {
    expect(store.index).toBeDefined();
  });
  it('index method should return list of users', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it('should have show method', () => {
    expect(store.show).toBeDefined();
  });
  it('show method should return one user', async () => {
    const userId = 1;
    const result = await store.show(userId);
    expect(result).toBeTruthy();
  });
});
