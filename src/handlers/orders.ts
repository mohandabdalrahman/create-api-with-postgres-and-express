import express, { Request, Response } from 'express';
import verifyToken from '../middlewares/veify-token';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
  try {
    const { user_id, status } = req.body;
    const order: Order = {
      user_id,
      status,
    };
    const newOrder = await store.create(order);
    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const userId  = req.params.id;
    const order = await store.show(+userId);
    return res.json(order);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const { quantity, productId } = req.body;
    const addProduct = await store.addProduct(+quantity, +orderId, +productId);
    console.log('addProduct', addProduct);
    return res.status(201).json(addProduct);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const order_routes = (app: express.Application) => {
  app.get('/orders/users/:id', verifyToken, show);
  app.post('/orders', verifyToken, create);
  app.post('/orders/:id/products', verifyToken, addProduct);
};

export default order_routes;
