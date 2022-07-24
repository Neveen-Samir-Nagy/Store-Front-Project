# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index --> '/products' [Get]
- Show --> '/products/showById/:id' [Get]
- Create [token required] --> '/products/create' [Post]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category) --> '/products/showByCategory/:category' [Get]

#### Users
- Index [token required] --> '/users' [Get]
- Show [token required] --> '/users/showById/:id' [Get]
- Create N[token required] --> '/users/create' [Post]

#### Orders
- Current Order by user (args: user id)[token required] --> '/orders/currentOrder/:user_id' [Get]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] --> '/orders/showCompletedOrders/:user_id' [Get]
- Create order [token required] --> '/orders/createOrder' [Post]
- Create order with products [token required] --> '/orders/createOrderWithProducts' [Post]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

#### Database Schema
- TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(15),
    lastName VARCHAR(15),
    password TEXT
);
- TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(20)
);
- TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id BIGINT REFERENCES users(id)
);
-TABLE orders_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    product_id BIGINT REFERENCES products(id),
    order_id BIGINT REFERENCES orders(id)
);

