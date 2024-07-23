import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

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

export default generateFile;