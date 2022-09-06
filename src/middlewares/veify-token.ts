import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    jwt.verify(token!, process.env.TOKEN_SECRET!);
    next();
  } catch (error) {
    return res.status(401).json('Access denied, invalid token');
  }
};

export default verifyToken;
