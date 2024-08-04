import User from '../models/Users.js';
import { jwtDecode } from 'jwt-decode';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const getProfile = async (req, res) =>{
    try {
        const authHeader = req.headers['authorization'];
        if(!authHeader) res.sendStatus(401);
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.SECRET_KEY,
            async (err, decoded) => {
                if(err){
                    const error = new Error();
                    error.success = false;
                    error.message = "Please Login Again" 
                    return res.status(403).json(error);
                } 
                // res.user = decoded.username;
                decoded.iat = undefined
                decoded.exp = undefined
                const id = decoded.id;
                const user = await User.findById(id);
                user.password = undefined;
                res.status(200).json({
                    success: true,
                    user
                });
            }
        )

        // const accessToken = req.cookies.access_token;
        // if (!accessToken || !verifyAccessToken(accessToken)) {
        //     return res.status(401).send('Unauthorized');
        // }
        // user = getUserFromAccessToken(accessToken);
        // res.json(user.profile);


        // const tok  = req.body.token;
        // if (!tok) {
        //     const error = new Error();
        //     error.statusCode = 401;
        //     error.message = "No token authorization denied";
        //     error.success = false;
        //     return res.status(401).json(error);
        // }

        // const decoded = jwtDecode(tok);
        // const user = await User.findById(decoded.id).select("-password");

        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }

        // res.status(200).json({
        //     success: true,
        //     user
        // });
    } catch (error) {
        console.log(error);
    }
}

export default getProfile;