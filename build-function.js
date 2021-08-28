/* eslint-disable */
console.log('I am being called for functions');
const { exec } = require('child_process');

const logCallback = (error, stdout, stderr) => {
  if (error) {
    console.error(`error: \n${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: \n${stderr}`);
    return;
  }
  console.log(`stdout: \n${stdout}`);
};

exec('ls', logCallback);
exec('yarn build', logCallback);
