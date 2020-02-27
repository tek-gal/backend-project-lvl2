const keyTypeMapper = {
  hasChildren: (keyInfo, level) => parseCompared(keyInfo.value, level),
  unchanged:   (keyInfo, level) => '',
  deleted: function(keyInfo, level) {
    return `Property ${this._getPath(level)} was deleted`;
  },
  added: function(keyInfo, level) {
    const path = this._getPath(level);
    const value = this._getValue(keyInfo.value);
    return `Property ${path} was added with value: ${value}`;
  },
  changed: function(keyInfo, level) {
    const path = this._getPath(level);
    const parsedOldValue = this._getValue(keyInfo.oldValue);
    const parsedNewValue = this._getValue(keyInfo.newValue);
    return `Property ${path} was changed from ${parsedOldValue} to ${parsedNewValue}`;
  },

  _getValue(value) {
    let result;

    if (value instanceof Object) {
      result = '[complex value]';
    } else if (typeof value === 'string') {
      result = `'${value}'`;
    } else {
      result = value;
    }

    return result;
  },
  _getPath(level) {
    return level.join('.');
  }
};

const parseCompared = (compared, level = []) => compared
  .reduce((acc, keyInfo) => {
    const newLevel = [...level, keyInfo.name];
    let parsed = keyTypeMapper[keyInfo.type](keyInfo, newLevel);

    return [...acc, parsed];
  }, [])
  .filter((parsed) => parsed !== '')
  .join('\n');

export default parseCompared;
