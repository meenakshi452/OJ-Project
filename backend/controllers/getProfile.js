import User from '../models/Users.js';
import { jwtDecode } from "jwt-decode";
import dotenv from 'dotenv';
dotenv.config();

const getProfile = async (req, res) =>{
    try {
        const tok  = req.body.token;
        if (!tok) {
            const error = new Error();
            error.statusCode = 401;
            error.message = "No token authorization denied";
            error.success = false;
            return res.status(401).json(error);
        }

        const decoded = jwtDecode(tok);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
    }
}

export default getProfile;