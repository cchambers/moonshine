/* eslint-disable */
const glob = require('glob');
const fs = require('fs-extra');

const schema = {};
let count = 0;

glob.sync('src/components/**/schema.json')
  .forEach((dir) => {
    count += 1;
    const component = dir.split('/')[2];
    const data = JSON.parse(fs.readFileSync(dir, 'utf8'));
    schema[component] = data;
  });

const data = JSON.stringify(schema);
fs.writeFileSync('src/components/all.json', data);
console.log(`${count} component schemas bundled...`);
