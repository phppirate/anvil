let fs = require('fs');
let osap = require('osap');
let shell = require('electron').shell;
let basePath = __dirname;
basePath = basePath.split('/');
basePath.splice(-1);
basePath = basePath.join('/');
let config = null;
let configPath = basePath + "/forge.config.json";
let loggedIn = localStorage.getItem('config');
console.log(loggedIn);
if(loggedIn){
    config = JSON.parse(loggedIn)
}