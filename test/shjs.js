const path = require('path');

const test = require('ava');

const shell = require('shelljs');

const binPath = path.resolve(__dirname, '../bin/shjs');

function runWithShjs(name, ...args) {
  // prefix with 'node ' for Windows, don't prefix for unix
  const execPath = process.platform === 'win32'
    ? `${JSON.stringify(shell.config.execPath)} `
    : '';
  if (!name) {
    return shell.exec(`${execPath}${binPath}`, {
      silent: true
    });
  }
  const script = path.resolve(__dirname, 'resources', 'shjs', name);
  let argString = args.map(arg => JSON.stringify(arg)).join(' ');
  if (argString) {
    argString = ' ' + argString;
  }
  return shell.exec(`${execPath}${binPath} ${script}${argString}`, {
    silent: true
  });
}

//
// Valids
//

test('Non-zero exit code', t => {
  const result = runWithShjs('exit-codes.js');
  t.is(result.code, 42);
  t.is(result.stdout, '');
  t.falsy(result.stderr);
});

test('Zero exit code', t => {
  const result = runWithShjs('exit-0.js');
  t.is(result.code, 0);
  t.is(result.stdout, '');
  t.falsy(result.stderr);
});

test('Stdout/Stderr', t => {
  const result = runWithShjs('stdout-stderr.js');
  t.is(result.code, 0);
  t.is(result.stdout, 'stdout: OK!\n');
  t.is(result.stderr, 'stderr: OK!\n');
});

test('CoffeeScript', t => {
  const result = runWithShjs('coffeescript.coffee');
  t.is(result.code, 0);
  t.is(result.stdout, 'CoffeeScript: OK!\n');
  t.falsy(result.stderr);
});

test('JS extension inference', t => {
  const result = runWithShjs('a-file');
  t.is(result.code, 0);
  t.is(result.stdout, 'OK!\n');
  t.falsy(result.stderr);
});

test('CoffeeScript extension inference', t => {
  const result = runWithShjs('coffeescript');
  t.is(result.code, 0);
  t.is(result.stdout, 'CoffeeScript: OK!\n');
  t.falsy(result.stderr);
});

test('Multiple arguments', t => {
  const result = runWithShjs('echo-args.js', 'hello', 'there');
  t.is(result.code, 0);
  t.regex(result.stdout, /hello there\n$/);
  t.falsy(result.stderr);
});

//
// Invalids
//

test('disallow require-ing', t => {
  t.throws(() => require(binPath),
    { instanceOf: Error },
    'Executable-only module should not be required');
});

test('Script file does not exist', t => {
  const result = runWithShjs('fake-file.js');
  t.is(result.code, 1);
  t.regex(result.stdout, /^ShellJS: script not found.*fake-file\.js.*/);
  t.falsy(result.stderr);
});

test('Missing script file name argument', t => {
  const result = runWithShjs();
  t.is(result.code, 1);
  t.regex(result.stdout, /^ShellJS: missing argument \(script name\).*/);
  t.falsy(result.stderr);
});
