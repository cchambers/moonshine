
import path from 'path';
const __dirname = path.dirname('.');
import fs from 'fs-extra';
let names;
importrompt from 'prompt';
let schema = {
  properties: {
    name: {
      description: 'Name the component', 
      required: true
    }
  }
};

prompt.start();

prompt.get(schema, function (err, result) {
  if (result) generateComponent(result.name);
});

let replace = {
  actual: 'Component Template',
  element: 'component-template',
  script: 'ComponentTemplate'
};

function generateComponent(name) {
  let split = name.split(' ');
  let actual = [];
  names = Object.assign({}, replace);
  split.forEach(str => {
    let data = str.toLowerCase();
    let first = data.charAt(0).toUpperCase();
    let last = data.slice(1);
    let capitalized = `${first}${last}`;
    actual.push(capitalized);
  });
  names.actual = actual.join(' ');
  names.script = actual.join('');

  let element = (split.length > 1) ? [] : ['sh'];
  split.forEach(str => {
    str = str.toLowerCase(); 
    element.push(str)
  });
  names.element = element.join('-');

  copyTemplate(names);
}

function copyTemplate(names) {
  let newDir = `${__dirname}/src/components/${names.element}`;
  fs.copy(`${__dirname}/src/components/component-template`, newDir)
  .then(() => {
    console.log(`New component created: ${names.actual}`);
    replaceNames(newDir, names);
  })
  .catch(err => console.error(err));
}

function replaceNames(dir, names) {
  // cycle through each file
  let newTemplate = `${dir}/vue/${names.script}.vue`;
  fs.rename(`${dir}/vue/ComponentTemplate.vue`, newTemplate, (err) => {
    if (err) throw err;
  });

  // let newScript = `${dir}/script/${names.script}.js`;
  // fs.rename(`${dir}/script/ComponentTemplate.js`, newScript, (err) => {
  //   if (err) throw err;
  // })

  let files = walkSync(dir);
  updateFiles(files);
}

var walkSync = function(dir, filelist) {
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    } else {
      filelist.push({
        dir: dir,
        filename: file
      });
    }
  });
  return filelist;
};

function updateFiles(files) {
  for (let x = 0, l = files.length; x < l; x += 1)  {
    writeUpdates(`${files[x].dir}/${files[x].filename}`);
  }
  console.log('Your new component was created.');
  console.log('If this component is going to prod, be sure to update the production flag in its schema!');
}

function writeUpdates(filename) {
  let contents = fs.readFileSync(filename, 'utf8');
  contents = updateContents(contents)
  fs.writeFileSync(filename, contents);
}

function updateContents(data) {
  let str = data;
  for (key in replace) {
    let rep = replace[key];
    let regex = new RegExp(rep,'g');
    str = str.replace(regex, names[key]);
  }
  return str
}