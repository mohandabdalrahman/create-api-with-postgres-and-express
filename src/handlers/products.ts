import express, { Request, Response } from 'express';
import verifyToken from '../middlewares/veify-token';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    return res.json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(+req.params.id);
    return res.json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const newProduct = await store.create(product);
    return res.json(newProduct);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products',verifyToken, create);
};
export default product_routes;
