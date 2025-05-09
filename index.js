#!/usr/bin/env node

/* globals test, env */

const path = require('path');

require('shelljs/global');

function exitWithErrorMessage(msg) {
  console.log(msg);
  console.log();
  process.exit(1);
}

if (process.argv.length < 3) {
  exitWithErrorMessage('ShellJS: missing argument (script name)');
}

var args;
  var scriptName = process.argv[2];
env.NODE_PATH = path.join(__dirname, '..', '..');

if (!scriptName.match(/\.js/) && !scriptName.match(/\.coffee/)) {
  if (test('-f', scriptName + '.js')) {
    scriptName += '.js';
  }
  if (test('-f', scriptName + '.coffee')) {
    scriptName += '.coffee';
  }
}

if (!test('-f', scriptName)) {
  exitWithErrorMessage('ShellJS: script not found (' + scriptName + ')');
}

args = process.argv.slice(3);
process.argv = [process.argv[0], process.argv[1], ...args];

var extensions = require('interpret').extensions;
var rechoir = require('rechoir');

rechoir.prepare(extensions, scriptName);
// eslint-disable-next-line import/no-dynamic-require
require(require.resolve(path.resolve(process.cwd(), scriptName)));
