const concat = require('concat');
const fs = require('fs');
var path = require('path');
const dotenv = require('dotenv');
let envConfig = dotenv.parse(fs.readFileSync('.env'))
let promise = concat(['./dist/js/chunk-vendors.js', './dist/js/index.js'], './dist/js/shine.js');

function moveFile(dir, dest) {
    fs.copyFile(dir, dest, (err) => {
        if (err) {
            console.log(`File copy error; ${dest} may not exist... check your .env file.`)
        } else {
            console.log('File successfully copied to destination.');
        }
    });
}

promise.then(function() {
    if (envConfig.SHINE_SCRIPT_PATH) {
        let dest = envConfig.SHINE_SCRIPT_PATH;
        let dir = path.join(__dirname, '/dist/js/shine.js');
        moveFile(dir, dest);
    }
    if (envConfig.SHINE_STYLE_PATH) {
        let dest = envConfig.SHINE_STYLE_PATH;
        let dir = path.join(__dirname, '/dist/css/index.css');
        moveFile(dir, dest);
    }
});
