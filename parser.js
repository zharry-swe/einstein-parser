"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var readConfigFile = function (file) {
    if (!file) {
        return null;
    }
    var fileContents = (0, fs_1.readFileSync)(file, 'utf-8');
    var fileArray = fileContents.split(/\r?\n/);
    console.log(fileArray);
    return fileArray;
};
readConfigFile('./config.txt');
