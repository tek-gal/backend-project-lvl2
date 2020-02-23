import fs from 'fs';
import path from 'path';
import compareFiles, { compareFilesInObject } from '../src/index.js';

const fixturesDirName = './__fixtures__/';
const fixturesDirPath = path.join(__dirname, fixturesDirName);
const consoleOutputFilepath = path.join(fixturesDirPath, 'json_result.txt');

const getFilepath = (filename) => path.join(fixturesDirPath, filename);

const testFiles = [
  ['json', 'before.json', 'after.json', 'compareObjects_result.json'],
  ['yml', 'before.yml', 'after.yml', 'compareObjects_result.json'],
];

test.each(testFiles)('compareFilesInObject %s',
  (code, beforeFilename, afterFilename, resultFilename) => {
    const beforeFilepath = getFilepath(beforeFilename);
    const afterFilepath = getFilepath(afterFilename);
    const resultFilepath = getFilepath(resultFilename);

    const result = compareFilesInObject(beforeFilepath, afterFilepath);
    const expected = JSON.parse(fs.readFileSync(resultFilepath, 'utf-8').trim());

    expect(result).toEqual(expected);
  });

test.each(testFiles)('compareConsoleOutput %s',
  (code, beforeFilename, afterFilename) => {
    const beforeFilepath = getFilepath(beforeFilename);
    const afterFilepath = getFilepath(afterFilename);
    const resultFilepath = consoleOutputFilepath;

    const result = compareFiles(beforeFilepath, afterFilepath);
    const expected = fs.readFileSync(resultFilepath, 'utf-8').trim();

    expect(result).toEqual(expected);
  });
