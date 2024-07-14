import User from '../models/Users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();


 const signin = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        
        if(!(email && password)){
            const error = new Error();
            error.statusCode = 400;
            error.message = "Please enter all the required fields";
            error.success = false;
            return res.status(400).json(error);
        }
        if(!user) {
            const error = new Error();
            error.statusCode = 400;
            error.message = "wrong credentials";
            error.success = false;
            return res.status(404).json(error);
        }
        const validate = await bcrypt.compare(password, user.password);
        if (!validate) {
            const error = new Error();
            error.statusCode = 400;
            error.message = "wrong credentials";
            error.success = false;
            return res.status(403).json(error);
        }
        const token = jwt.sign({id:user._id, email}, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        user.password = undefined;
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(201).json({
            message: "You have successfully signed in",
            success: true,
            user,
            token
        })

    } catch (error) {
        console.log(error);
    }
}

export default signin;