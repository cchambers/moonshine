/* eslint-disable */ 
import concat from 'concat';
import fs from 'fs';
import path from 'path';
const __dirname = path.dirname('.');
import dotenv from 'dotenv';
const envConfig = dotenv.parse(fs.readFileSync('.env'));
const promise = concat(['./dist/js/chunk-vendors.js', './dist/js/index.js'], './dist/js/shine.js');

function moveFile(dir, dest) {
  fs.copyFile(dir, dest, (err) => {
    if (err) {
      console.log(`File copy error; ${dest} may not exist... check your .env file.`);
    } else {
      console.log('File successfully copied to destination.');
    }
  });
}

promise.then(() => {
  if (envConfig.SHINE_SCRIPT_PATH) {
    const dest = envConfig.SHINE_SCRIPT_PATH;
    const dir = path.join(__dirname, '/dist/js/shine.js');
    moveFile(dir, dest);
  }
  if (envConfig.SHINE_STYLE_PATH) {
    const dest = envConfig.SHINE_STYLE_PATH;
    const dir = path.join(__dirname, '/dist/css/index.css');
    moveFile(dir, dest);
  }
});
