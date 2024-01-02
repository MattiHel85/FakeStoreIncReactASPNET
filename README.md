# Front-end Project - FakeShop Inc

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)


## Project description

I created the FakeStore Inc React app using React, Redux, TypeScript, with styling done using SASS and MUI components.

1. I built the following API using ASP.NET CORE, Entity Framework Core, and PostgreSQL and deployed it in [Azure](https://fakestoreinc.azurewebsites.net/api/v1/). Here is the GitHub [repo](https://github.com/MattiHel/fs16_CSharp-FullStack), which is a private repo for now but I will be moving into a public repo soon enough.
2. Pages created (Landing page, Products, Product, Users, User, Sign Up, Sign In, Admin, AccessDenied, and AlreadySignedIn)
3. I created a Redux store for the following features:
  - product reducer: get all products, find a single product, Add Product, Edit Product, Delete Product
  - user reducer: get all users, get single user, sign up, edit user
  - auth reducer: sign in and get user profile
  - cart reducer: add product to cart, remove products, update products's quantity in cart
4. The following routes were added using react-router-dom:
  - "/" - landing page
  - "/products" - products page
  - "/products/:id" - single product page
  - "/users" - users page
  - "/users/:id" - single user page
  - "/admin" - admin page
  - "/checkout" - checkout page
  - "/contact" - contact page
5. Implemented unit testing implemented for reducers mentioned above
6. Deployed the application  [https://fakestoreinc.netlify.app/](here)


## Bonus

1. I used pagination when displaying all the products and users using MUI
2. In order to prevent multiple items with quantities of 1 to be added to the cart I wrote a debounce method and used it to prevent rapid clicks on 'add to cart'

## Instruction to start the project

In the project directory, you can run:

### `npm install`

Install all the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
