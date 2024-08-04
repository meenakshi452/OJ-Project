
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import {exec} from 'child_process'

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); 

const dirInputs = path.join(__dirname, 'inputs');

if (!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
}

const generateInputFile = async (input) => {
    const jobID = uuidv4();
    const input_filename = `${jobID}.txt`;
    const input_filePath = path.join(dirInputs, input_filename);
    await fs.writeFileSync(input_filePath, input);
    return input_filePath;
};

const dirCodes = path.join(__dirname, 'codes')

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive: true});
}

const generateFile = async (language, code) => {
    const jobId =  uuidv4();
    const filename = `${jobId}.${language}`;
    const filePath = path.join(dirCodes, filename);
    fs.writeFileSync(filePath, code);
    return filePath;
};


const outputPath = path.join(__dirname, 'outputs')

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true});
}

const executeC = async (filePath, inputPath) => {
    const jobId = path.basename(filePath).split('.')[0];
    const output_filename = `${jobId}.out`
    const outpath = path.join(outputPath, output_filename);

    return new Promise((resolve, reject) => {
        exec(`gcc ${filePath} -o ${outpath} && cd ${outputPath} && ./${output_filename} < ${inputPath}`,
             (error, stdout, stderr) => {
            if(error){
                reject({error, stderr});
            }
            if(stderr){
                reject(stderr);
            }
            resolve(stdout);
        });
    });
};

const executeCpp = async (filePath, inputPath) => {
    const jobId = path.basename(filePath).split('.')[0];
    const output_filename = `${jobId}.out`
    const outpath = path.join(outputPath, output_filename);

    // setTimeout(, 3000)
    return new Promise ((resolve, reject) => {
        exec(`g++ ${filePath} -o ${outpath} && cd ${outputPath} && ./${output_filename} < ${inputPath}`,
             (error, stdout, stderr) => {
            if(error){
                reject({error, stderr});
            }
            if(stderr){
                reject(stderr);
            }
            resolve(stdout);
        });
    });
};

const executePython = async (filePath, inputPath) => {
    const jobId = path.basename(filePath).split('.')[0];
    const output_filename = `${jobId}.exe`
    const outpath = path.join(outputPath, output_filename);

    return new Promise((resolve, reject) => {
        exec(`python ${filePath} -o ${outpath} < ${inputPath}`,
             (error, stdout, stderr) => {
            if(error){
                reject({error, stderr});
            }
            if(stderr){
                reject(stderr);
            }
            resolve(stdout);
        });
    });
};


 const run = async (req, res) => {
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
            console.log(filePath);
            const inputPath = await generateInputFile(input);
            console.log(inputPath);
            const output = await executeCpp(filePath, inputPath);
            console.log(output);
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
}
export  {run, generateFile, generateInputFile, executeC, executeCpp, executePython};