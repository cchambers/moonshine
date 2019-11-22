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

  // iterate and split into categories

  const sorted = {};

  Object.entries(schema).forEach((item) => {
    const key = item[0];
    const value = item[1];
    const cat = value.category;
    if (!sorted[cat]) {
      sorted[cat] = {};
    }
    sorted[cat][key] = value;
  });

const data = JSON.stringify(sorted);
fs.writeFileSync('src/components/all.json', data);
console.log(`${count} component schemas bundled...`);
