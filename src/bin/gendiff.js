#!/usr/bin/env node

const pckg = require('./../../package.json')
const commander = require('commander');

const program = new commander.Command();

program.description(pckg.description);
program.version(pckg.version, '-V, --version', 'output the version number');

program.help();

program.parse(process.argv);
