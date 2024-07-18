import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
  });

const problemSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
    },
    description:{
      type: String,
      required: true,
    },
    difficulty:{
      type: String,
      required: true,
    },
    inputDesc:{
      type: String,
      required: true,
    },
    outputDesc:{
      type: String,
      required: true,
    },
    tags:{
      type: [String],
    },
    testCases:{
      type: [testCaseSchema],
      required: true,
    },
    createdBy:{
      type: String,
    },
}, {timestamps: true})

const Problem = mongoose.model('Problem', problemSchema);
export default Problem;