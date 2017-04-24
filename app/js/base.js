let fs = require('fs');
let basePath = __dirname;
basePath = basePath.split('/');
basePath.splice(-1);
basePath = basePath.join('/');
let config = null;

config = JSON.parse(fs.readFileSync(basePath + "/forge.config.json"))