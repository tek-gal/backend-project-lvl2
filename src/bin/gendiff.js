#!/usr/bin/env node
import fs from 'fs';
import * as commander from 'commander';
import compareFiles from '..';

const program = new commander.Command();
const pckg = JSON.parse(fs.readFileSync('./../../package.json'));

program.description(pckg.description);
program.version(pckg.version, '-V, --version', 'output the version number');

program.arguments('<firstConfig> <secondConfig>')
  .action((filepath1, filepath2) => {
    const compared = compareFiles(filepath1, filepath2, program.format);
    console.log(compared);
  });

program.option('-f, --format [type]', 'output format');

program.parse(process.argv);
