import fs from 'fs';
import path from 'path';
import compareFiles, { compareFilesInObject } from '../src/index.js';

const fixturesDirName = './__fixtures__/';
const fixturesDirPath = path.join(__dirname, fixturesDirName);

const getFilepath = (filename) => path.join(fixturesDirPath, filename);

const testFiles = [
  ['json', 'before.json', 'after.json', 'json_result.txt'],
  ['yml', 'before.yml', 'after.yml', 'yml_result.txt'],
  ['ini', 'before.ini', 'after.ini', 'ini_result.txt'],
];
//
// test.each(testFiles)('compareFilesInObject %s',
//   (code, beforeFilename, afterFilename, resultFilename) => {
//     const afterFilepath = getFilepath(afterFilename);
//     const resultFilepath = getFilepath(resultFilename);
//
//     const result = compareFilesInObject(beforeFilepath, afterFilepath);
//     const expected = JSON.parse(fs.readFileSync(resultFilepath, 'utf-8').trim());
//
//     const beforeFilepath = getFilepath(beforeFilename);
//     expect(result).toEqual(expected);
//   });

test.each(testFiles)('compareConsoleOutput %s',
  (code, beforeFilename, afterFilename, resultFilename) => {
    const beforeFilepath = getFilepath(beforeFilename);
    const afterFilepath = getFilepath(afterFilename);
    const resultFilepath = getFilepath(resultFilename);

    const result = compareFiles(beforeFilepath, afterFilepath);
    const expected = fs.readFileSync(resultFilepath, 'utf-8').trim();

    expect(result).toEqual(expected);
  });
