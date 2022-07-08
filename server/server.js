
import express, { application } from 'express';
import cors from 'cors';

// importing morgan package using import syntax gives an errors so use require syntax to import it
const morgan = require('morgan');	

require('dotenv').config(); //help load environment variables

//create express app
const app = express();

//create middleware

app.use(cors()); // enable cors
app.use(express.json());  // parse incoming requests data to json
app.use(morgan('dev'));  // log requests to console
app.use((req, res, next) => {
    console.log("I am middleware");
    next();
});

//route
app.get('/', (req, res) => {
    res.send('You hit the end point');
});

//port
const port = process.env.PORT || 5000;

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})