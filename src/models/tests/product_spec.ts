import { OrderStore } from '../order';
import { Product, ProductStore } from '../product';
const productStore = new ProductStore();
const orderStore = new OrderStore();

describe('product model', () => {
  it('should have create method', () => {
    expect(productStore.create).toBeDefined();
  });

  it('create method should return new created product', async () => {
    const product: Product = {
      name: 'test',
      price: 100,
    };
    const result = await productStore.create(product);
    expect(result).toBeTruthy();
  });

  it('should have index method', () => {
    expect(productStore.index).toBeDefined();
  });
  it('index method should return list of products', async () => {
    const result = await productStore.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it('should have show method', () => {
    expect(productStore.show).toBeDefined();
  });
  it('show method should return one product', async () => {
    const productId = 1;
    const result = await productStore.show(productId);
    expect(result).toBeTruthy();
  });
});

describe('order model', () => {
  it('should have addProduct method', () => {
    expect(orderStore.addProduct).toBeDefined();
  });
  it('should  add Product to specific order', async () => {
    const newProduct = {
      quantity: 2,
      productId: 1,
      orderId: 1,
    };
    const result = await orderStore.addProduct(
      newProduct.quantity,
      newProduct.orderId,
      newProduct.productId
    );
    expect(result).toBeTruthy();
  });
});
