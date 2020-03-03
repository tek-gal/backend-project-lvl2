import fs from 'fs';
import path from 'path';
import parse from './parser.js';
import compare from './compare.js';
import format from './formatters';


const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

export default (filepath1, filepath2, toFormat) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);

  const obj1 = parse(extension1, data1);
  const obj2 = parse(extension2, data2);

  const compared = compare(obj1, obj2);
  const formatted = format(compared, toFormat);

  return formatted;
};
