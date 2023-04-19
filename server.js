// importing all third party libraries
require('dotenv').config();
const express = require('express');

// importing different modules
const MDBConnection = require('./config/dbConnection');
const routes = require('./routes');

//configuring express app
const app = express();
const PORT = process.env.PORT || 3000;

//setting up body-parsers
app.use(express.json());

//setting up routes
app.use('/', routes);

//mongodb connection and listening to server
MDBConnection().then(() => {
    app.listen(PORT, (err) => {
        if(err) {
            console.log(err);
        }

        console.log('server is running in port ', PORT);
    })
}).catch(err => {
    console.log(err);
    process.exit(1);
})
