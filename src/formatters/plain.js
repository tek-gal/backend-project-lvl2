const notShownKeys = ['unchanged'];

const keyTypeMapper = {
  complex: (keyInfo, level) => format(keyInfo.children, level),
  unchanged: () => '',
  deleted(keyInfo, level) {
    const path = this.getPath(level);
    return `Property ${path} was deleted`;
  },
  added(keyInfo, level) {
    const path = this.getPath(level);
    const value = this.getValue(keyInfo.newValue);
    return `Property ${path} was added with value: ${value}`;
  },
  changed(keyInfo, level) {
    const path = this.getPath(level);
    const parsedOldValue = this.getValue(keyInfo.oldValue);
    const parsedNewValue = this.getValue(keyInfo.newValue);
    return `Property ${path} was changed from ${parsedOldValue} to ${parsedNewValue}`;
  },

  getValue(value) {
    let result;

    if (value instanceof Array) {
      result = '[complex value]';
    } else if (typeof value === 'string') {
      result = `'${value}'`;
    } else {
      result = value;
    }

    return result;
  },
  getPath(level) {
    return `'${level.join('.')}'`;
  },
};

const getFormatted = (keyInfo, level) => keyTypeMapper[keyInfo.type](keyInfo, level);

const format = (compared, level = []) => compared
  .filter((keyInfo) => !notShownKeys.includes(keyInfo.type))
  .reduce((acc, keyInfo) => {
    const newLevel = [...level, keyInfo.name];
    return [...acc, getFormatted(keyInfo, newLevel)];
  }, [])
  .join('\n');

export default format;
