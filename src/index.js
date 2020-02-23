import compareObjects from './compare.js';
import parseFile from './parsers.js';
import toJSON from './exporters.js';


export const compareFilesInObject = (filepath1, filepath2) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  return compareObjects(obj1, obj2);
};

export default (filepath1, filepath2) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const result = compareObjects(obj1, obj2);
  const stringified = toJSON(result);

  return stringified;
};
