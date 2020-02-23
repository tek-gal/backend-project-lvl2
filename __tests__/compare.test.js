import fs from 'fs';
import path from 'path';
import compareFiles from '../src/index.js';

const fixturesDirName = './__fixtures__/';
const fixturesDirPath = path.join(__dirname, fixturesDirName);

const getFilepath = (filename) => path.join(fixturesDirPath, filename);

const beforeFilename = 'flat_before.json';
const afterFilename = 'flat_after.json';
const resultFilename = 'flat_result.txt';

test('compareFiles', () => {
  const beforeFilepath = getFilepath(beforeFilename);
  const afterFilepath = getFilepath(afterFilename);
  const resultFilepath = getFilepath(resultFilename);

  const result = compareFiles(beforeFilepath, afterFilepath);
  const expected = fs.readFileSync(resultFilepath, 'utf-8').trim();

  expect(result).toEqual(expected);
});
