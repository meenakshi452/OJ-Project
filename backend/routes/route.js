import signin from '../controllers/signin.js'
import express from 'express'
import signup from '../controllers/signup.js';


const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup)

export default router;