const keyTypeMapper = {
  complex(keyInfo, level) {
    const indent = this.getIndent(level);
    const value = this.getValue(keyInfo.nested, level);
    return `${indent}  ${keyInfo.name}: ${value}`;
  },
  unchanged(keyInfo, level) {
    const indent = this.getIndent(level);
    const value = this.getValue(keyInfo.oldValue, level);
    return `${indent}  ${keyInfo.name}: ${value}`;
  },
  deleted(keyInfo, level) {
    const indent = this.getIndent(level);
    const value = this.getValue(keyInfo.oldValue, level);
    return `${indent}- ${keyInfo.name}: ${value}`;
  },
  added(keyInfo, level) {
    const indent = this.getIndent(level);
    const value = this.getValue(keyInfo.newValue, level);
    return `${indent}+ ${keyInfo.name}: ${value}`;
  },
  changed(keyInfo, level) {
    const oldValue = this.getValue(keyInfo.oldValue, level);
    const newValue = this.getValue(keyInfo.newValue, level);
    const indent = this.getIndent(level);

    const row = `${indent}- ${keyInfo.name}: ${oldValue}
${indent}+ ${keyInfo.name}: ${newValue}`;

    return row;
  },

  getValue(value, level) {
    if (value instanceof Array) {
      // eslint-disable-next-line no-use-before-define
      const result = format(value, level);
      return result;
    }

    return value;
  },
  getIndent(level) {
    return `${'  '.repeat(level)}${'  '.repeat(level - 1)}`;
  },
};

const getFormatted = (keyInfo, level) => keyTypeMapper[keyInfo.type](keyInfo, level);

const format = (reducedKeys, level = 0) => {
  const newLevel = level + 1;
  const formatted = reducedKeys
    .reduce((acc, keyInfo) => [...acc, getFormatted(keyInfo, newLevel)], ['{']);

  const completed = [...formatted, `${'  '.repeat(level)}}`];
  return completed
    .join('\n')
    .replace(/(\s)\}(\n)/g, '   }\n');
};

export default format;
