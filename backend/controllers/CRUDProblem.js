import Problem from "../models/Problem.js";
import { jwtDecode } from "jwt-decode";

const CRUDProblem = {
    //create new problem
    createProblem: async (req, res) => {
        const { name, description, difficulty, testCases, tok } = req.body;
        const createdBy = jwtDecode(tok).id;
        if(!(name && description && difficulty && testCases && tok)){
            const error = new Error();
            error.statusCode = 400;
            error.message = "Please enter all the required fields";
            error.success = false;
            return res.status(400).json(error);
        }
        if(testCases.length == 0){
            const error = new Error();
            error.statusCode = 400;
            error.message = "Please enter at least one test case";
            error.success = false;
            return res.status(400).json(error);
        }
        //how to error handle when input or output of any test case is missing

        
        const problem = await Problem.create({
            name,
            description,
            difficulty,
            testCases,
            createdBy
        });
        res.status(201).json({
            message: "You have successfully created problem",
            success: true,
            problem,
        })
    
    },

    //update a problem
    updateProblem: async (req, res) => {
        const {
            name,
            description,
            difficulty,
            testCases
          } = req.body;
          try {
            const existingProblem = await Problem.findByIdAndUpdate(
              req.params.id,
              {
                name,
                description,
                difficulty,
                testCases
              },
              { new: true }
            );
      
            if (!existingProblem)
              return res.status(404).json({ error: "Problem not found!" });
      
            res.status(200).json({
                message: "You have successfully updated the problem",
                success: true,
                existingProblem,
            })
          } catch (error) {
            res.status(500).json({ message: error.message });
          }

    },

    //delete a problem
    deleteProblem: async (req, res) => {
          try {
            const existingProblem = await Problem.findByIdAndDelete(
              req.params.id
            );
      
            if (!existingProblem)
              return res.status(404).json({ error: "Problem not found!" });
      
            res.status(200).json({
                message: "You have successfully deleted the problem",
                success: true,
                existingProblem,
            })
          } catch (error) {
            res.status(500).json({ message: error.message });
          }

    },

    //get a problem
    getProblem: async (req, res) => {
          try {
            const existingProblem = await Problem.findById(
              req.params.id
            );
      
            if (!existingProblem)
              return res.status(404).json({ error: "Problem not found!" });
      
            res.status(200).json({
                message: "You have successfully fetched the problem",
                success: true,
                existingProblem,
            })
          } catch (error) {
            res.status(500).json({ message: error.message });
          }

    },

    getAllProblems: async (req, res) => {
        try {
          const problems = await Problem.find();
          res.status(200).json(problems);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },

}


export default CRUDProblem;