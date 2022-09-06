import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import verifyToken from '../middlewares/veify-token';
import { User, UserStore } from '../models/user';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    return res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(+req.params.id);
    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, password } = req.body;
    const user: User = {
      firstName,
      lastName,
      password,
    };
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET!);
    return res.json(token);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const user_routes = (app: express.Application) => {
  app.get('/users', verifyToken, index);
  app.get('/users/:id', verifyToken, show);
  app.post('/users', create);
};

export default user_routes;
