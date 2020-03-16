import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const keyTypeMapper = {
  nested: (path, info, func) => func(info.children, path),
  unchanged: () => null,
  deleted: (path) => `Property '${path}' was deleted`,
  added: (path, info) => `Property '${path}' was added with value: ${stringify(info.newValue)}`,
  changed: (path, info) => `Property '${path}' was changed from ${stringify(info.oldValue)} to ${stringify(info.newValue)}`,
};

const getFormatted = (path, keyInfo, func) => keyTypeMapper[keyInfo.type](path, keyInfo, func);
const getPath = (oldPath, newPath) => (oldPath ? `${oldPath}.${newPath}` : newPath);

const format = (compared, path = '') => compared
  .map((keyInfo) => {
    const newPath = getPath(path, keyInfo.name);
    return getFormatted(newPath, keyInfo, format);
  })
  .filter((row) => row)
  .join('\n');

export default format;
