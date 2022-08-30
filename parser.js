"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var omitConfigComments = function (fileArray) {
    return fileArray.filter(function (line) { return !line.includes('#'); });
};
var readConfigFile = function (file) {
    var fileContents = (0, fs_1.readFileSync)(file, 'utf-8');
    var fileArray = fileContents.split(/\r?\n/);
    return fileArray;
};
var generateKeyValues = function (fileArray) {
    return fileArray.map(function (item) {
        return item.split('=').map(function (value) { return value.trim(); });
    });
};
var generateConfigObject = function (fileArray) {
    return Object.fromEntries(fileArray);
};
var isNumeric = function (num) {
    return (typeof num === 'number' ||
        (typeof num === 'string' && num.trim() !== '')) &&
        !isNaN(num);
};
var convertToNumbers = function (object) {
    Object.keys(object).forEach(function (key) {
        if (isNumeric(object[key])) {
            object[key] = parseFloat(object[key]);
        }
    });
};
var convertToBool = function (object) {
    var boolOptions = {
        yes: true,
        no: false,
        on: true,
        off: false,
        "true": true,
        "false": false
    };
    Object.keys(object).forEach(function (key) {
        if (object[key] in boolOptions) {
            object[key] = boolOptions[object[key]];
        }
    });
};
var parseConfigTextFile = function (fileLocation) {
    var fileObject = generateConfigObject(generateKeyValues(omitConfigComments(readConfigFile(fileLocation))));
    convertToNumbers(fileObject);
    convertToBool(fileObject);
    return fileObject;
};
var configurationObject = parseConfigTextFile('./config.txt');
console.log('Conversion Completed: \n');
console.log(configurationObject);
console.log("\nPlease use object how you see fit, AKA host: ".concat(configurationObject.host));
