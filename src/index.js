import compareObjects from './compare.js';
import parseFile from './parsers.js';
import formatter from './formatters';


export default (filepath1, filepath2, format = 'default') => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const compared = compareObjects(obj1, obj2);
  const formatted = formatter(format, compared);
  return formatted;
};
