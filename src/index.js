import fs from 'fs';
import path from 'path';
import compare from './compare.js';
import parse from './parsers.js';
import format from './formatters';


const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

export default (filepath1, filepath2, toFormat) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const obj1 = parse(path.extname(filepath1), data1);
  const obj2 = parse(path.extname(filepath2), data2);

  const compared = compare(obj1, obj2);
  const formatted = format(compared, toFormat);

  return formatted;
};
