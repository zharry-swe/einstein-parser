import { readFileSync, promises as fsPromises } from 'fs';

const readConfigFile = (file: string): string[] | null => {
    if (!file) {
        return null;
    }
    const fileContents = readFileSync(file, 'utf-8');
    const fileArray = fileContents.split(/\r?\n/);
    console.log(fileArray);
    return fileArray;
};

readConfigFile('./config.txt');
