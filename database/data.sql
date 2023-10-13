-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

insert into "products" ("name", "style", "color", "image", "price")
values ('HYDROFLASK', '40 oz Wide Mouth with Flex Straw Cap', 'Dew', '/images/H1.jpg', 55),
       ('HYDROFLASK', '40 oz Wide Mouth with Flex Straw Cap', 'Black', '/images/H2.jpg', 55),
       ('HYDROFLASK', '40 oz Wide Mouth with Flex Straw Cap', 'Grapefruit', '/images/H3.jpg', 55),
       ('HYDROFLASK', '40 oz Wide Mouth with Flex Straw Cap', 'Jade', '/images/H4.jpg', 55),
       ('HYDROFLASK', '40 oz Wide Mouth with Flex Straw Cap', 'Goji', '/images/H5.jpg', 55),
       ('STANLEY', 'THE QUENCHER H2.0 FLOWSTATE™ TUMBLER 40 oz', 'Pink Dusk', '/images/S1.jpg', 45),
       ('STANLEY', 'THE QUENCHER H2.0 FLOWSTATE™ TUMBLER 40 oz', 'Orchid', '/images/S2.png', 45),
       ('STANLEY', 'THE QUENCHER H2.0 FLOWSTATE™ TUMBLER 40 oz', 'Pool', '/images/S3.png', 45),
       ('STANLEY', 'THE QUENCHER H2.0 FLOWSTATE™ TUMBLER 40 oz', 'Eucalyptus', '/images/S4.png', 45),
       ('STANLEY', 'THE QUENCHER H2.0 FLOWSTATE™ TUMBLER 40 oz', 'Charcoal', '/images/S5.png', 45),
       ('YETI', 'RAMBLER 18 oz Water Bottle with Chug Cap', 'Power Pink', '/images/Y1.png', 30),
       ('YETI', 'RAMBLER 18 oz Water Bottle with Chug Cap', 'Cosmic Lilac', '/images/Y2.png', 30),
       ('YETI', 'RAMBLER 18 oz Water Bottle with Chug Cap', 'Rescue Red', '/images/Y3.png', 30),
       ('YETI', 'RAMBLER 18 oz Water Bottle with Chug Cap', 'Black', '/images/Y4.png', 30),
       ('YETI', 'RAMBLER 18 oz Water Bottle with Chug Cap', 'Seafoam', '/images/Y5.png', 30),
       ('TAKEYA', 'Insulated Stainless Steel Water Bottle With Straw Lid 24 oz', 'Canary', '/images/T1.png', 35),
       ('TAKEYA', 'Insulated Stainless Steel Water Bottle With Straw Lid 24 oz', 'Lilac', '/images/T2.png', 35),
       ('TAKEYA', 'Insulated Stainless Steel Water Bottle With Straw Lid 24 oz', 'Teal', '/images/T3.png', 35),
       ('TAKEYA', 'Insulated Stainless Steel Water Bottle With Straw Lid 24 oz', 'Arctic', '/images/T4.png', 35),
       ('TAKEYA', 'Insulated Stainless Steel Water Bottle With Straw Lid 24 oz', 'Blush', '/images/T5.png', 35);

insert into "users" ("userId", "firstName", "lastName", "email", "username", "hashedPassword")
values (1, 'Hannah', 'Hoang', 'hello@yahoo.com', 'hannah', '$argon2id$v=19$m=4096,t=3,p=1$RW1Rjr2yZxJ7+lGmPNQuOg$RyKFhjq4r8xuk7uY6GDDWjOMQ6IpAVx7murGif9F8kY')
