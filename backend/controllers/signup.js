import User from '../models/Users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const signup = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        if(!(name && email && password)){
            const error = new Error();
            error.statusCode = 400;
            error.message = "Please enter all the required fields";
            error.success = false;
            return res.status(400).json(error);
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-+]).*$/;
        if (!passwordRegex.test(password)) {
            const error = new Error();
            error.statusCode = 400;
            error.message = "Password must contain at least one special character and one number";
            error.success = false;
            return res.status(400).json(error);
        }

        if(password.length < 8){
            const error = new Error();
            error.statusCode = 400;
            error.message = "Password should be at least 8 characters";
            error.success = false;
            return res.status(400).json(error);
        }
        const existingUser = await  User.findOne({email});
        if(existingUser){
            const error = new Error();
            error.statusCode = 400;
            error.message = "User already exists";
            error.success = false;
            return res.status(400).json(error);
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
            success: true,
            user,
            token
        })

    } catch (error) {
        console.log(error);
    }
}

export default signup;