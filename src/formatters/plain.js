import _ from 'lodash';

const notShownKeys = ['unchanged'];

const getPath = (oldP, newP) => oldP ? `${oldP}.${newP}` : newP;
const values = [
  {
    check: (value) => value instanceof Array,
    make: () => '[nested value]',
  },
  {
    check: (value) => typeof value === 'string',
    make: (value) => `'${value}'`,
  },
  {
    check: () => true,
    make: (value) => value,
  },
];

const getValue = (value) => {
  const { make } = _.find(values, ({ check }) => check(value));
  return make(value);
};

const keyTypeMapper = {
  nested: (path, info, func) => func(info.children, path),
  unchanged: () => '',
  deleted: (path) => `Property '${path}' was deleted`,
  added: (path, info) => `Property '${path}' was added with value: ${getValue(info.newValue)}`,
  changed: (path, info) => `Property '${path}' was changed from ${getValue(info.oldValue)} to ${getValue(info.newValue)}`,
};

const getFormatted = (path, keyInfo, func) => keyTypeMapper[keyInfo.type](path, keyInfo, func);

const format = (compared, path = '') => compared
  .filter((keyInfo) => !notShownKeys.includes(keyInfo.type))
  .reduce((acc, keyInfo) => {
    const newPath = getPath(path, keyInfo.name);
    return [...acc, getFormatted(newPath, keyInfo, format)];
  }, [])
  .join('\n');

export default format;
