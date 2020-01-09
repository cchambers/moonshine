/* eslint-disable */
const glob = require('glob');
const fs = require('fs-extra');
const chalk = require('chalk');

const schema = {};
let count = 0;

glob.sync('src/utilities/**/schema.json')
  .forEach((dir) => {
    count += 1;
    const name = dir.split('/')[2];
    const data = JSON.parse(fs.readFileSync(dir, 'utf8'));
    schema[name] = data;
  });

// iterate and split into categories

const sorted = {};

Object.entries(schema)
  .forEach((item) => {
    const key = item[0];
    const value = item[1];
    const cat = value.category.toLowerCase();
    if (key !== 'component-template') {
      if (!sorted[cat]) {
        sorted[cat] = {};
      }
      sorted[cat][key] = value;
    }
  });

glob.sync('src/components/**/schema.json')
  .forEach((dir) => {
    const name = dir.split('/')[2];
    const data = JSON.parse(fs.readFileSync(dir, 'utf8'));
    if (process.env.NODE_ENV === 'production' && !data.production) return;
    schema[name] = data;
    count += 1;
  });

  // iterate and split into categories


  Object.entries(schema).forEach((item) => {
    const key = item[0];
    const value = item[1];
    const cat = value.category.toLowerCase();
    if (key !== 'component-template') {
      if (!sorted[cat]) {
        sorted[cat] = {};
      }
      sorted[cat][key] = value;
    }
  });

const data = JSON.stringify(sorted);
fs.writeFileSync('src/components/all.json', data);
console.log(chalk.black.bgGreen(' SHINE '), `${count} component schemas bundled...`);
