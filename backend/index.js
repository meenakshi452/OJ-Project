import express from 'express'
import DBConnection from './database/db.js';
import dotenv from 'dotenv';
import router from './routes/route.js';
dotenv.config();
import cors from 'cors';

const app = express()

app.use(
    cors({
        origin: process.env.CLIENT_URL || 
"https://oj-project-cr6i.vercel.app" || "https://oj-project-cr6i-meenakshis-projects-a38089d9.vercel.app",
        credentials: true,
    })
);


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

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
})