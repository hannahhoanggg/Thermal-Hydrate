set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "orders" (
  "orderId" serial PRIMARY KEY,
  "userId" int NOT NULL
);

CREATE TABLE "orderItems" (
  "orderItemId" serial PRIMARY KEY,
  "orderId" int,
  "productId" int,
  "quantity" int
);

CREATE TABLE "products" (
  "productId" serial PRIMARY KEY,
  "name" text,
  "style" text,
  "color" text,
  "image" text,
  "price" int
);

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "firstName" text,
  "lastName" text,
  "email" text UNIQUE,
  "username" text,
  "hashedPassword" text
);

CREATE TABLE "paymentDetails" (
  "paymentId" serial PRIMARY KEY,
  "orderId" int,
  "total" float
);

ALTER TABLE "orders" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "orderItems" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("orderId");

ALTER TABLE "orderItems" ADD FOREIGN KEY ("productId") REFERENCES "products" ("productId");

ALTER TABLE "paymentDetails" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("orderId");
