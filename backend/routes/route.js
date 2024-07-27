import signin from '../controllers/signin.js'
import express from 'express'
import signup from '../controllers/signup.js';
import getProfile from '../controllers/getProfile.js';
import logout from '../controllers/logout.js';
import CRUDProblem from '../controllers/CRUDProblem.js';
import dotenv from 'dotenv';
import verifyJWT from '../middleware/verifyJWT.js';
dotenv.config();


const router = express.Router();

//auth routes
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/logout", logout);
router.post("/profile", getProfile);
// router.post("/verify", verifyJWT);


//problem routes
router.post("/createProblem",verifyJWT, CRUDProblem.createProblem);
router.put("/:id",verifyJWT, CRUDProblem.updateProblem);
router.delete("/:id",verifyJWT, CRUDProblem.deleteProblem);
router.post("/:id", CRUDProblem.submitProblem);
router.route("/problemList").get( CRUDProblem.getAllProblems);
router.route("/geteasy").get( CRUDProblem.getEasy);
router.route("/getmedium").get( CRUDProblem.getMedium);
router.route("/gethard").get( CRUDProblem.getHard);
router.route("/search").get( CRUDProblem.searchQuery);
router.get("/:id", CRUDProblem.getProblem);



export default router;