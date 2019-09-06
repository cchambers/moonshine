const concat = require('concat');
const fs = require('fs');
var path = require('path');
const dotenv = require('dotenv');
let envConfig = dotenv.parse(fs.readFileSync('.env'))
let promise = concat(['./dist/js/chunk-vendors.js', './dist/js/index.js'], './dist/js/shine.js');

function moveFile(dir, dest) {
    fs.copyFile(dir, dest, (err) => {
        if (err) throw err;
        console.log('Shine.js copied to main repo.');
    });
}

promise.then(function() {
    if (envConfig.SHINE_SCRIPT_PATH) {
        let dest = envConfig.SHINE_SCRIPT_PATH;
        let dir = path.join(__dirname, '/dist/js/shine.js');
        moveFile(dir, dest);
    }
});
