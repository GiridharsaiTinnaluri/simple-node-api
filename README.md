# simple-node-api

This repository contains a simple Nodejs API that performs CRUD (Create, Read, Update, Delete) operations on a MongoDB database. The API is well commented and follows a scalable folder structure that separates the routes, controllers, models and utilities. 😊

To run the API, you need to have Node.js and MongoDB(or Mongodb Atlas) installed on your machine. Then, clone this repository and run `npm install` to install the dependencies. Next, create a `.env` file in the root folder and add your MongoDB connection string as `MONGO_URI` and PORT. Finally, run `npm start` to start the server.

The API has four endpoints:

- `GET /products/`: Returns a list of all products in the database. 📃
- `POST /products/create`: Creates a new product with the given name and quantity in the body of the request. Returns the created product. 🆕
- `PUT /products/:id/update_quantity/?number=10`: Updates the product with the given id with the name and quantity in the body of the request. Returns the updated      product. 🔄
- `DELETE /products/:id`: Deletes the product with the given id from the database. Returns a message confirming the deletion. ❌

You can use tools like Postman or curl to test the API.  😎

#Demo Link

firebase link - 
