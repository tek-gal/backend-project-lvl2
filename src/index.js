import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import compare from './comparer.js';
import format from './formatters';

const getData = (filepath) => {
  const fileContent = fs.readFileSync(filepath, 'utf8');
  const extension = path.extname(filepath).slice(1);
  return parse(extension, fileContent);
};

export default (filepath1, filepath2, toFormat) => {
  const obj1 = getData(filepath1);
  const obj2 = getData(filepath2);

  const compared = compare(obj1, obj2);
  const formatted = format(compared, toFormat);

  return formatted;
};
