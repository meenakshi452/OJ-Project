import signin from '../controllers/signin.js'
import express from 'express'
import signup from '../controllers/signup.js';
import getProfile from '../controllers/getProfile.js';
import logout from '../controllers/logout.js';
import CRUDProblem from '../controllers/CRUDProblem.js';


const router = express.Router();

//auth routes
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/logout", logout);
router.post("/profile", getProfile);

//problem routes
router.post("/createProblem", CRUDProblem.createProblem);
router.put("/:id", CRUDProblem.updateProblem);
router.delete("/:id", CRUDProblem.deleteProblem);
router.get("/problemList", CRUDProblem.getAllProblems);
router.get("/:id", CRUDProblem.getProblem);

export default router;