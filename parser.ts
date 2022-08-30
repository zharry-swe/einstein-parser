import { readFileSync } from 'fs';

type ConfigObject = {
    [key: string]: any;
};

const omitConfigComments = (fileArray: string[]): string[] => {
    return fileArray.filter((line) => !line.includes('#'));
};

const readConfigFile = (file: string): string[] => {
    const fileContents = readFileSync(file, 'utf-8');
    const fileArray = fileContents.split(/\r?\n/);
    return fileArray;
};

const generateKeyValues = (fileArray: string[]): any => {
    return fileArray.map((item: string) =>
        item.split('=').map((value: string) => value.trim())
    );
};

const generateConfigObject = (fileArray: any[]): ConfigObject => {
    return Object.fromEntries(fileArray);
};

const isNumeric = (num: any) =>
    (typeof num === 'number' ||
        (typeof num === 'string' && num.trim() !== '')) &&
    !isNaN(num as number);

const convertToNumbers = (object: ConfigObject): void => {
    Object.keys(object).forEach((key) => {
        if (isNumeric(object[key])) {
            object[key] = parseFloat(object[key]);
        }
    });
};

const convertToBool = (object: ConfigObject): void => {
    const boolOptions = {
        yes: true,
        no: false,
        on: true,
        off: false,
        true: true,
        false: false,
    };

    Object.keys(object).forEach((key) => {
        if (object[key] in boolOptions) {
            object[key] = boolOptions[object[key]];
        }
    });
};

const parseConfigTextFile = (fileLocation: string): ConfigObject => {
    const fileObject = generateConfigObject(
        generateKeyValues(omitConfigComments(readConfigFile(fileLocation)))
    );
    convertToNumbers(fileObject);
    convertToBool(fileObject);
    return fileObject;
};

const configurationObject = parseConfigTextFile('./config.txt');

console.log('Conversion Completed: \n');
console.log(configurationObject);
console.log(
    `\nPlease use object how you see fit, AKA host: ${configurationObject.host}`
);
