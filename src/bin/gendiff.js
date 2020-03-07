#!/usr/bin/env node
import compareFiles from '..';

const commander = require('commander');
const pckg = require('./../../package.json');

const program = new commander.Command();

program.description(pckg.description);
program.version(pckg.version, '-V, --version', 'output the version number');

program.arguments('<firstConfig> <secondConfig>')
  .action((filepath1, filepath2) => {
    const compared = compareFiles(filepath1, filepath2, program.format);
    console.log(compared);
  });

program.option('-f, --format [type]', 'output format', 'windiff');

program.parse(process.argv);
