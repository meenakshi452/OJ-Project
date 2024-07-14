import express from 'express'
import DBConnection from './database/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import router from './routes/route.js';
import User from './models/Users.js';
dotenv.config();


const app = express()

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

DBConnection();

app.use('/', router);

app.listen(8000, ()=>{
    console.log("Server is listening on port 8000");
})