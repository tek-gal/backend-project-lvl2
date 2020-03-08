import fs from 'fs';
import path from 'path';
import compareFiles from '../src/index.js';

const fixturesDirName = './__fixtures__/';
const fixturesDirPath = path.join(__dirname, fixturesDirName);

const getFilepath = (filename) => path.join(fixturesDirPath, filename);

const testFiles = [
  // default
  ['json', 'windiff', 'before.json', 'after.json', 'result_windiff.txt'],
  ['yml', 'windiff', 'before.yml', 'after.yml', 'result_windiff.txt'],
  ['ini', 'windiff', 'before.ini', 'after.ini', 'result_windiff.txt'],
  // json
  ['json', 'json', 'before.json', 'after.json', 'result_json.txt'],
  ['yml', 'json', 'before.yml', 'after.yml', 'result_json.txt'],
  ['ini', 'json', 'before.ini', 'after.ini', 'result_json.txt'],
  // plain
  ['json', 'plain', 'before.json', 'after.json', 'result_plain.txt'],
  ['yml', 'plain', 'before.yml', 'after.yml', 'result_plain.txt'],
  ['ini', 'plain', 'before.ini', 'after.ini', 'result_plain.txt'],
];

test.each(testFiles)('compare %s to %s',
  (extension, format, beforeFilename, afterFilename, resultFilename) => {
    const beforeFilepath = getFilepath(beforeFilename);
    const afterFilepath = getFilepath(afterFilename);
    const resultFilepath = getFilepath(resultFilename);

    const result = compareFiles(beforeFilepath, afterFilepath, format);
    const expected = fs.readFileSync(resultFilepath, 'utf-8').trim();

    expect(result).toEqual(expected);
  });
