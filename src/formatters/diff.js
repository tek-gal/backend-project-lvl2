import _ from 'lodash';

const getIndent = (level) => `${' '.repeat((level) * 4)}`;
const stringify = (keyValue, level) => {
  if (!_.isObject(keyValue)) {
    return keyValue;
  }

  const formatted = Object
    .entries(keyValue)
    .map(([key, value]) => `${getIndent(1)}${key}: ${value}`);
  return ['{', ...formatted, '}'].join(`\n${getIndent(level)}`);
};

const makeRow = (name, value, level, symbol) => `${getIndent(level).slice(0, -2)}${symbol} ${name}: ${
  stringify(value, level)
}`;

const keyTypes = {
  nested(info, level, iter) {
    const indent = getIndent(level);
    const formattedChildren = iter(info.children, level + 1).join('\n');
    return `${indent}${info.name}: {\n${formattedChildren}\n${indent}}`;
  },
  unchanged: (info, level) => makeRow(info.name, info.oldValue, level, ' '),
  deleted: (info, level) => makeRow(info.name, info.oldValue, level, '-'),
  added: (info, level) => makeRow(info.name, info.newValue, level, '+'),
  changed: (info, level) => `${makeRow(info.name, info.oldValue, level, '-')}
${makeRow(info.name, info.newValue, level, '+')}`,
};

const format = (compared) => {
  const iter = (data, level) => data
    .map((keyInfo) => keyTypes[keyInfo.type](keyInfo, level, iter));

  return ['{', ...iter(compared, 1), '}'].join('\n');
};

export default format;
