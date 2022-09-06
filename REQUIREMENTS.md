# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
#### Products                             ### Api Routes
- Index                                   '/api/products' [GET]
- Show                                    '/api/products/:id' [GET]
- Create [token required]                  '/api/products'    [POST]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users                         ### Api Routes
- Index [token required]            '/api/users' [GET]
- Show [token required]              '/api/users/:id' [GET]
- Create N[token required]            '/api/users' [POST]

#### Orders                                                          ### Api Routes
- Current Order by user (args: user id)[token required]                '/api/orders/users:userId'
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category
Table: products (id:integer, name:varchar, price:integer)
#### User
- id
- firstName
- lastName
- password
Table Users (id:integer, firstName:varchar,lastName:varchar, password:varchar)
#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
Table Orders (id:integer, product_id:integer[foreign key to products table],user_id:integer[foreign key to users table],order_status:varchar, quantity_product:integer)

