import User from '../models/Users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const signup = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        if(!(name && email && password)){
            return res.status(400).send({
                message: "Please enter all the required fields",
                success:  false
            });
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-+]).*$/;
        if (!passwordRegex.test(password)) {
        res.status(400).send({ 
            message: 'Password must contain at least one special character and one number',
            success: false
        });
        }

        if(password.length < 8){
            return res.status(400).send({
                message: "Password should be at least 8 characters",
                success: false
        });
        }
        const existingUser = await  User.findOne({email});
        if(existingUser){
            return res.status(400).send({
                message: "User already exists",
                success: false
            });
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