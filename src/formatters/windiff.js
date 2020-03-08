import _ from 'lodash';

const values = [
  {
    check: (value) => value instanceof Array,
    make: (value, func, level) => func(value, level),
  },
  {
    check: () => true,
    make: (value) => value,
  },
];

const getIndent = (level, bracket = false) => `${' '.repeat((level) * 4)}${' '.repeat(bracket ? 0 : 2)}`;
const getValue = (value, func, level) => {
  const { make } = _.find(values, ({ check }) => check(value));
  return make(value, func, level);
};


const keyTypes = {
  nested: (name, indent, oV, nV, info, func, level) => `${indent}  ${name}: ${func(info.children, level)}`,
  unchanged: (name, indent, oldValue) => `${indent}  ${name}: ${oldValue}`,
  deleted: (name, indent, oldValue) => `${indent}- ${name}: ${oldValue}`,
  added: (name, indent, oV, newValue) => `${indent}+ ${name}: ${newValue}`,
  changed: (name, indent, oldValue, newValue) => `${indent}- ${name}: ${oldValue}
${indent}+ ${name}: ${newValue}`,
};

const getFormatted = (level, info, func) => {
  const newLevel = level + 1;
  const indent = getIndent(level);
  const oldValue = getValue(info.oldValue, func, newLevel);
  const newValue = getValue(info.newValue, func, newLevel);
  return keyTypes[info.type](info.name, indent, oldValue, newValue, info, func, newLevel);
};

const format = (compared, level = 0) => {
  const formatted = compared
    .reduce((acc, keyInfo) => {
      const f = getFormatted(level, keyInfo, format);
      return [...acc, f];
    }, ['{']);

  return [...formatted, `${getIndent(level, true)}}`]
    .join('\n');
};

export default format;
