import fs from 'fs'
import path, { resolve } from 'path'
import {exec} from 'child_process'

import { fileURLToPath } from 'url';
import { error } from 'console';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const outputPath = path.join(__dirname, 'outputs')

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true});
}

const executeC = async (filePath, inputPath) => {
    const jobId = path.basename(filePath).split('.')[0];
    const output_filename = `${jobId}.exe`
    const outpath = path.join(outputPath, output_filename);

    return new Promise((resolve, reject) => {
        exec(`gcc ${filePath} -o ${outpath} && cd ${outputPath} && .\\${output_filename} < ${inputPath}`,
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

export default executeC;