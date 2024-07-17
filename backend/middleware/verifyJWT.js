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
            if(err) return res.sendStatus(403);
            req.user = decoded.username;
            next();
        }
    )
}

export default verifyJWT;