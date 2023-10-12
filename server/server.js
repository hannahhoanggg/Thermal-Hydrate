import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import {
  ClientError,
  errorMiddleware,
  defaultMiddleware,
  authMiddleware,
} from './lib/index.js';

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

// GET all products
app.get('/api/products', async (req, res, next) => {
  try {
    const sql = `select * from "products"`;
    const result = await db.query(sql);
    const products = result.rows;
    if (!products) {
      throw new ClientError(404, 'Cannot find any products');
    }
    res.status(201).json(products);
  } catch (error) {
    next(error);
  }
});

// GET products based on productId
app.get('/api/products/:productId', async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (!Number.isInteger(productId) || productId <= 0) {
      throw new ClientError(400, 'ProductID must be a positive integer');
    }
    const sql = `select *
    from "products"
    where "productId" = $1
    `;
    const params = [productId];
    const result = await db.query(sql, params);
    const products = result.rows[0];
    if (!products) {
      throw new ClientError(
        404,
        `Cannot find any products with that ID ${productId}.`
      );
    }
    res.status(201).json(products);
  } catch (error) {
    next(error);
  }
});

// GET user's account info
app.get('/api/tables/users/:userId', authMiddleware, async (req, res, next) => {
  try {
    const sql = `select "firstName", "lastName", "username", "email"
    from "users"
    where "userId" = $1
    order by "userId"`;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// GET orders by the userId
app.get('/api/orders/:userId', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const sql = `
    select *
    from "users"
    join "orders" using "userId"
    join "orderItems" using "orderId"
    join "products" using "productId"
    where "userId" = $1
    `;
    const params = [userId];
    const result = await db.query(sql, params);
    const user = result.rows;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// User can create an account
app.post('/api/sign-up', async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, email } = req.body;
    if (!username || !password)
      throw new ClientError(400, 'Username and password are required fields');
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("username", "hashedPassword", "firstName", "lastName", "email")
      values ($1, $2, $3, $4, $5)
      returning *
    `;
    const params = [username, hashedPassword, firstName, lastName, email];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    const sqlOrders = `
    insert into "orders" ("userId")
    values ($1)
    returning *;
    `;
    const paramsOrders = [user.userId];
    await db.query(sqlOrders, paramsOrders);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// User can log into account
app.post('/api/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(401, 'Invalid login, please try again.');
    }
    const sql = `
      select "userId",
            "hashedPassword"
        from "users"
      where "username" = $1
    `;
    const params = [username];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'Invalid login, please try again.');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

// User can add to shopping cart
app.post('/api/orderItems/:orderId', authMiddleware, async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const { productId, quantity } = req.body;
    if (!orderId || !productId || !quantity)
      throw new ClientError(
        400,
        'OrderID, productID, and quantity are required fields'
      );
    const sql = `
    insert into "orderItems" ("orderId", "productId", "quantity")
    values ($1, $2, $3)
    returning *;
    `;
    const params = [orderId, productId, quantity];
    const result = await db.query(sql, params);
    const [shoppingcart] = result.rows;
    res.status(201).json(shoppingcart);
  } catch (error) {
    next(error);
  }
});

// GET request to display items
app.get('/api/orderItems/:orderId', async (req, res, next) => {
  try {
    const orderId = Number(req.params.orderId);
    if (!Number.isInteger(orderId) || orderId <= 0) {
      throw new ClientError(400, 'OrderID must be a positive integer');
    }
    const sql = `
    select "products"."name", "products"."style", "products"."image", "products"."price", "orderItems"."quantity", "orderItems"."orderItemId"
    from "products"
    join "orderItems" using ("productId")
    where "orderId" = $1
    `;
    const params = [orderId];
    const result = await db.query(sql, params);
    const cartItems = result.rows;
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

// User can update shopping cart
app.put(
  '/api/orderItems/:orderItemId',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { orderId, productId, quantity } = req.body;
      if (!quantity) throw new ClientError(400, 'Quantity is required');
      const sql = `
    update "orderItems"
    set "quantity" = $3
    where "orderItemId" = $1 and "productId" = $2
    returning *;
    `;
      const params = [orderId, productId, quantity];
      const result = await db.query(sql, params);
      const order = result.rows;
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);

// User can delete product from shopping cart
app.delete(
  '/api/orderItems/:orderItemId',
  authMiddleware,
  async (req, res, next) => {
    try {
      const orderItemId = Number(req.params.orderItemId);
      if (!Number.isInteger(orderItemId))
        throw new ClientError(400, 'OrderItemID must be an integer.');
      const sql = `
    delete from "orderItems"
    where "orderItemId" = $1
    returning *;
    `;
      const params = [orderItemId, req.user.orderItemId];
      const result = await db.query(sql, params);
      const [deleted] = result.rows;
      if (!deleted)
        throw new ClientError(404, `Entry with id ${orderItemId} not found.`);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */
app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
