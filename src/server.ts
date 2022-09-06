import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import order_routes from './handlers/order';
import product_routes from './handlers/products';
import user_routes from './handlers/users';
dotenv.config();

const app: express.Application = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

// Products routes
product_routes(app);
user_routes(app);
order_routes(app)
app.listen(PORT, function () {
  console.log(`starting app on: ${PORT}`);
});
