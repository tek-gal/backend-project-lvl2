const keyTypeMapper = {
  hasChildren(keyInfo) {
    const value = this.getValue(keyInfo.value);
    return { [`  ${keyInfo.name}`]: value };
  },
  unchanged(keyInfo) {
    const value = this.getValue(keyInfo.value);
    return { [`  ${keyInfo.name}`]: value };
  },
  deleted(keyInfo) {
    const value = this.getValue(keyInfo.value);
    return { [`- ${keyInfo.name}`]: value };
  },
  added(keyInfo) {
    const value = this.getValue(keyInfo.value);
    return { [`+ ${keyInfo.name}`]: value };
  },
  changed(keyInfo) {
    const oldValue = this.getValue(keyInfo.oldValue);
    const newValue = this.getValue(keyInfo.newValue);
    return {
      [`- ${keyInfo.name}`]: oldValue,
      [`+ ${keyInfo.name}`]: newValue,
    };
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
