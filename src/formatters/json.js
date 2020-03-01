const keyTypeMapper = {
  hasChildren(keyInfo) {
    return this.pattern(keyInfo, ' ');
  },
  unchanged(keyInfo) {
    return this.pattern(keyInfo, ' ');
  },
  deleted(keyInfo) {
    return this.pattern(keyInfo, '-');
  },
  added(keyInfo) {
    return this.pattern(keyInfo, '+');
  },
  changed(keyInfo) {
    const oldValue = this.getValue(keyInfo.oldValue);
    const newValue = this.getValue(keyInfo.newValue);
    return {
      [`- ${keyInfo.name}`]: oldValue,
      [`+ ${keyInfo.name}`]: newValue,
    };
  },

  pattern(keyInfo, symbol = ' ') {
    const value = this.getValue(keyInfo.value);
    return { [`${symbol} ${keyInfo.name}`]: value };
  },
  getValue(value) {
    if (value instanceof Array) {
      return parseCompared(value);
    }

    return value;
  },
};

const parseCompared = (reducedKeys) => {
  const result = reducedKeys.reduce((acc, keyInfo) => {
    const parsed = keyTypeMapper[keyInfo.type](keyInfo);
    return { ...acc, ...parsed };
  }, {});

  return result;
};

export default (reducedKeys) => JSON
  .stringify(parseCompared(reducedKeys), null, '    ')
  .replace(/"/g, '')
  .replace(/\},/g, '  },')
  .replace(/\}$/mg, '  }')
  .replace(/\s{2}\}$/, '}')
  .replace(/^\s{2}/gm, '');
