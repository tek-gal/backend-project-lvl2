import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import ini from 'ini';

const parserMapper = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (filepath) => {
  const parser = parserMapper[path.extname(filepath)];
  const string = fs.readFileSync(filepath, 'utf-8');
  return parser(string);
};
