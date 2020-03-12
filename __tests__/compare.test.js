import fs from 'fs';
import path from 'path';
import compareFiles from '../src/index.js';

const fixturesDirName = './__fixtures__/';
const fixturesDirPath = path.join(__dirname, fixturesDirName);

const getFilepath = (filename) => path.join(fixturesDirPath, filename);

const inputFormats = ['json', 'ini', 'yml'];
const outputFormats = ['plain', 'json', 'diff'];

const testFunction = (inputFormat) => (outputFormat) => {
  const beforeFilepath = getFilepath(`before.${inputFormat}`);
  const afterFilepath = getFilepath(`after.${inputFormat}`);
  const resultFilepath = getFilepath(`result_${outputFormat}.txt`);

  const result = compareFiles(beforeFilepath, afterFilepath, outputFormat);
  const expected = fs.readFileSync(resultFilepath, 'utf-8').trim();

  expect(result).toEqual(expected);
};

inputFormats.forEach((inputFormat) => {
  test.each(outputFormats)(
    `compare ${inputFormat} to %s`,
    testFunction(inputFormat),
  );
});
