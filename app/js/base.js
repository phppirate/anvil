let fs = require('fs');
let osap = require('osap');
let shell = require('electron').shell;
let basePath = __dirname;
basePath = basePath.split('/');
basePath.splice(-1);
basePath = basePath.join('/');
let accounts = null;
let configPath = basePath + "/forge.config.json";

if(localStorage.getItem('config')) {
    localStorage.setItem('accounts', JSON.stringify([JSON.parse(localStorage.getItem('config'))]))
}

let loggedIn = localStorage.getItem('accounts');
console.log(loggedIn);
if(loggedIn){
    accounts = JSON.parse(loggedIn)
}
