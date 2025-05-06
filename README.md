# Shjs

[![GitHub Actions](https://img.shields.io/github/actions/workflow/status/shelljs/shjs/main.yml?style=flat-square&logo=github)](https://github.com/shelljs/shjs/actions/workflows/main.yml)
[![Codecov](https://img.shields.io/codecov/c/github/shelljs/shjs/main.svg?style=flat-square&label=coverage)](https://codecov.io/gh/shelljs/shjs)
[![npm version](https://img.shields.io/npm/v/shelljs-shjs.svg?style=flat-square)](https://www.npmjs.com/package/shelljs-shjs)

`shjs` binary, formerly distributed as part of
[ShellJS](https://github.com/shelljs/shelljs).

```sh
npm install -g shelljs-shjs
```

**Note:** this package is published as `shelljs-shjs`, not as `shjs`.

## Maintenance mode

While this package is not explicitly deprecated, this is in maintenance mode. If
you want to execute ShellJS scripts, just use the `node` command (or whatever is
appropriate for the language of the script, ex. `coffee`).

This package was removed from ShellJS to reduce that module's dependencies and
to shrink overall download size.

## Usage

You can install with `npm install shelljs-shjs`:

```shell
$ npm install -g shelljs-shjs
```

This script is a convenience wrapper for guessing the right interpreter to use
for your script. It also brings your local shelljs install to the front of the
`NODE_PATH` to ensure this is used.

```javascript
#!/usr/bin/env shjs

// Save this demo as 'example_script.js'

var shell = require('shelljs');
shell.echo('hello world');
```

Then run the demo script with:

```shell
$ shjs example_script.js
hello world
```
