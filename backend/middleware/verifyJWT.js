import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.SECRET_KEY,
        (err, decoded) => {
            if(err){
                const error =  new Error();
                error.success = false;
                error.message = "You will have to login" 
                return res.status(403).json(error);
            } 
            req.user = decoded.username;
            next();
        }
    )
}

export default verifyJWT;