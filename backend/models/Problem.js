import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
    id: {
      type: Number,
    },
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
});
const tagSchema = new mongoose.Schema({
    id: {
      type: Number,
    },
    tags: {
      type: String,
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
      type: [tagSchema],
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