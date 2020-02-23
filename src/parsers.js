import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const parserMapper = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default (filepath) => {
  const parser = parserMapper[path.extname(filepath)];
  const string = fs.readFileSync(filepath);
  return parser(string);
};
