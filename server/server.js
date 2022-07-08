
import express, { application } from 'express';
import cors from 'cors';

import mongoose from 'mongoose'; // to connect to mongodb

import { readdirSync } from 'fs';  // readdirSync is a function that reads a directory and returns an array of files

// importing morgan package using import syntax gives an errors so use require syntax to import it
const morgan = require('morgan');	

require('dotenv').config(); //help load environment variables

//create express app
const app = express();

//connect to mongodb
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('**DB CONNECTED**');
}).catch(err => {
    console.log("DB Connection Error: " + err);
}
);



//apply middleware

app.use(cors()); // enable cors
app.use(express.json());  // parse incoming requests data to json
app.use(morgan('dev'));  // log requests to console
app.use((req, res, next) => {
    console.log("I am middleware");
    next();
});

//router
readdirSync("./routes").map((r)=>{
    app.use("/api",require(`./routes/${r}`));
});

//port
const port = process.env.PORT || 5000;

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})