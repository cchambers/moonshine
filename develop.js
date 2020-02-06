const { exec } = require('child_process');

exec('node --max_old_space_size=8000 node_modules/@vue/cli-service/bin/vue-cli-service.js serve --open', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
