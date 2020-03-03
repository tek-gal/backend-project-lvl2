import yaml from 'js-yaml';
import ini from 'ini';

const parserMapper = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (extension, fileData) => {
  const parser = parserMapper[extension];
  return parser(fileData);
};
