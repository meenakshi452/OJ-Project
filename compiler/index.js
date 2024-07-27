import express from 'express'
import cors from 'cors'
import generateFile from './generateFile.js';
import executeCpp from './executeCpp.js';
import generateInputFile from './generateInputFile.js';
import executeC from './executeC.js';
import executePython from './executePython.js';

const app = express();

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/run", async (req, res) => {
    const { language = 'cpp', code, input = ''  } = req.body; 
    if(code === undefined || !code){
        return res.status(500).json({
            "success": false,
            message: "empty code body!"
        })
    }
    if(language === 'cpp'){
        try {
            const filePath = await generateFile(language, code);
            const inputPath = await generateInputFile(input);
            const output = await executeCpp(filePath, inputPath);
            res.json({filePath, output})
        } catch (error) {
            res.status(500).json({
                "success": false,
                "tle":"tle",
                message: error
            })
        }
    }
    else if(language === 'c'){
        try {
            const filePath = await generateFile(language, code);
            const inputPath = await generateInputFile(input);
            const output = await executeC(filePath, inputPath);
            res.json({filePath, output})
        } catch (error) {
            res.status(500).json({
                "success": false,
                message: error.message
            })
        }
    }
    else if(language === 'py'){
        try {
            const filePath = await generateFile(language, code);
            const inputPath = await generateInputFile(input);
            const output = await executePython(filePath, inputPath);
            res.json({filePath, output})
        } catch (error) {
            res.status(500).json({
                "success": false,
                message: error.message
            })
        }
    }

    

})


app.listen(5000, () => {
    console.log("Server is listening on port 5000!");
});
