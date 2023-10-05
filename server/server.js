/* eslint-disable no-unused-vars  -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import {
  ClientError,
  errorMiddleware,
  defaultMiddleware,
} from './lib/index.js';

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
// eslint-disable-next-line no-unused-vars -- Remove when used
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

// app.get('/api/hello', (req, res) => {
//   res.json({ message: 'Hello, World!' });
// });

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
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// User can log in
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
