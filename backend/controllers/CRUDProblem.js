import executeCpp from "../../compiler/executeCpp.js";
import Problem from "../models/Problem.js";
import { jwtDecode } from "jwt-decode";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import generateFile from "../../compiler/generateFile.js";
import generateInputFile from "../../compiler/generateInputFile.js";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const CRUDProblem = {
  //create new problem
  createProblem: async (req, res) => {
    const {
      name,
      description,
      difficulty,
      inputDesc,
      outputDesc,
      tags,
      testCases,
      tok,
    } = req.body;
    const createdBy = jwtDecode(tok).id;
    if (
      !(
        name &&
        description &&
        difficulty &&
        testCases &&
        tok &&
        inputDesc &&
        outputDesc
      )
    ) {
      const error = new Error();
      error.statusCode = 400;
      error.message = "Please enter all the required fields";
      error.success = false;
      return res.status(400).json(error);
    }
    if (testCases.length == 0) {
      const error = new Error();
      error.statusCode = 400;
      error.message = "Please enter at least one test case";
      error.success = false;
      return res.status(400).json(error);
    }

    //error handle when input or output of any test case is missing
    for (let i = 0; i < testCases.length; i++) {
      if (!(testCases[i].input && testCases[i].output)) {
        const error = new Error();
        error.statusCode = 400;
        error.message = "Please enter inputs and outputs of all test case";
        error.success = false;
        return res.status(400).json(error);
      }
    }

    const problem = await Problem.create({
      name,
      description,
      difficulty,
      inputDesc,
      outputDesc,
      tags,
      testCases,
      createdBy,
    });
    res.status(201).json({
      message: "You have successfully created problem",
      success: true,
      problem,
    });
  },

  //update a problem
  updateProblem: async (req, res) => {
    const {
      name,
      description,
      difficulty,
      inputDesc,
      outputDesc,
      tags,
      testCases,
      tok,
    } = req.body;
    if (
      !(
        name &&
        description &&
        difficulty &&
        testCases &&
        inputDesc &&
        outputDesc
      )
    ) {
      const error = new Error();
      error.statusCode = 400;
      error.message = "Please enter all the required fields";
      error.success = false;
      return res.status(400).json(error);
    }
    if (testCases.length == 0) {
      const error = new Error();
      error.statusCode = 400;
      error.message = "Please enter at least one test case";
      error.success = false;
      return res.status(400).json(error);
    }

    //error handle when input or output of any test case is missing
    for (let i = 0; i < testCases.length; i++) {
      if (!(testCases[i].input && testCases[i].output)) {
        const error = new Error();
        error.statusCode = 400;
        error.message = "Please enter inputs and outputs of all test case";
        error.success = false;
        return res.status(400).json(error);
      }
    }
    // const UserId = jwtDecode(tok).id;
    // const CreatorId = Problem.findById(req.params.id).createdBy;
    // if(!(UserId === CreatorId)){
    //   const error = new Error();
    //   error.statusCode = 400;
    //   error.message = "You are not Authenticated to update this problem";
    //   error.success = false;
    //   return res.status(400).json(error);
    // }
    try {
      const existingProblem = await Problem.findByIdAndUpdate(
        req.params.id,
        {
          name,
          description,
          difficulty,
          inputDesc,
          outputDesc,
          tags,
          testCases,
        },
        { new: true }
      );

      if (!existingProblem)
        return res.status(404).json({ error: "Problem not found!" });

      res.status(200).json({
        message: "You have successfully updated the problem",
        success: true,
        existingProblem,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  //delete a problem
  deleteProblem: async (req, res) => {
    // const {tok} = req.body;
    // const UserId = jwtDecode(tok).id;
    // const CreatorId = Problem.findById(req.params.id).createdBy;
    // if(!(UserId === CreatorId)){
    //     const error = new Error();
    //     error.statusCode = 400;
    //     error.message = "You are not Authenticated to delete this problem";
    //     error.success = false;
    //     return res.status(400).json(error);
    // }
    try {
      const existingProblem = await Problem.findByIdAndDelete(req.params.id);

      if (!existingProblem)
        return res.status(404).json({ error: "Problem not found!" });

      res.status(200).json({
        message: "You have successfully deleted the problem",
        success: true,
        existingProblem,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  //get a problem
  getProblem: async (req, res) => {
    try {
      const existingProblem = await Problem.findById(req.params.id);

      if (!existingProblem)
        return res.status(404).json({ error: "Problem not found!" });

      res.status(200).json({
        message: "You have successfully fetched the problem",
        success: true,
        existingProblem,
      });
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

  submitProblem: async (req, res) => {
    const { language = "cpp", code } = req.body;

    if (!code) {
      const error = new Error();
      error.statusCode = 400;
      error.message = "Empty code!";
      return res.json(error);
    }

    try {
      const problem = await Problem.findById(req.params.id);

      if (!problem) {
        return res.status(404).json({ error: "Problem not found" });
      }


      const results = [];
      for (const testCase of problem.testCases) {
        try {
          const filePath = await generateFile(language, code);
          const inputPath = await generateInputFile(testCase.input);
          const output = await executeCpp(filePath, inputPath);
          const actualOutput = output.trim();
          const expectedOutput = testCase.output.trim();
          const passed = actualOutput === expectedOutput;

          results.push({
            input: testCase.input,
            expectedOutput: expectedOutput,
            actualOutput: actualOutput,
            passed: passed,
          });
          if (!passed) {
            break;
          }
        } catch (error) {
          results.push({
            input: testCase.input,
            expectedOutput: testCase.output,
            actualOutput: null,
            passed: false,
            error: error.message,
          });
        }
      }

      res.status(200).json(results);
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  },
};

export default CRUDProblem;
