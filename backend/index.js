const express = require('express')
const app = express()
const {DBConnection} = require('./database/db.js');
const User = require('./models/Users.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv');
dotenv.config();


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

DBConnection();

app.get("/hi", (req, res)=>{
    res.send("Welcome to today's class!");
})
app.post("/signup", async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        if(!(name && email && password)){
            return res.status(400).send("Please enter all the required fields");
        }
        
        if(password.length < 8){
            return res.status(400).send("Please enter at least 8 characters");
        }
        const existingUser = await  User.findOne({email});
        if(existingUser){
            return res.status(400).send("User already exists");
        }

        const hashPassword = bcrypt.hashSync(password, 10);
        console.log(hashPassword);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });

        const token = jwt.sign({id:user._id, email}, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });
        user.token = token;
        user.password = undefined;
        res.status(201).json({
            message: "You have successfully registered",
            user
        })

    } catch (error) {
        console.log(error);
    }
})

app.post("/signin", async (req, res)=>{
    try {
        const {email, password} = req.body;
        if(!(email && password)){
            return res.status(400).send("Please enter all the required fields");
        }
        const existingUser = await  User.findOne({email});
        if(!(existingUser === email)){
            return res.status(400).send("Wrong credentials")
        }

    } catch (error) {
        console.log(error);
    }
})


app.listen(8000, ()=>{
    console.log("Server is listening on port 8000");
})