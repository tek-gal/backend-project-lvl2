const parse = (value, level) => {
  let result;

  if (value instanceof Object) {
    result = parseCompared(value, level);
  } else {
    result = value;
  }

  return result;
}
// 
// const keyTypeMapper = {
//   hasChildren: (keyInfo, level) => parseCompared(keyInfo.value, level),
//   unchanged:   (keyInfo, level) => '',
//   deleted: function(keyInfo, level) {
//     return `Property ${this._getPath(level)} was deleted`;
//   },
//   added: function(keyInfo, level) {
//     const path = this._getPath(level);
//     const value = this._getValue(keyInfo.value);
//     return `Property ${path} was added with value: ${value}`;
//   },
//   changed: function(keyInfo, level) {
//     const path = this._getPath(level);
//     const parsedOldValue = this._getValue(keyInfo.oldValue);
//     const parsedNewValue = this._getValue(keyInfo.newValue);
//     return `Property ${path} was changed from ${parsedOldValue} to ${parsedNewValue}`;
//   },
//
//   _getValue(value) {
//     let result;
//
//     if (value instanceof Object) {
//       result = '[complex value]';
//     } else if (typeof value === 'string') {
//       result = `'${value}'`;
//     } else {
//       result = value;
//     }
//
//     return result;
//   },
//   _getPath(level) {
//     return level.join('.');
//   }
// };

function parseCompared(reducedKeys, level = 0) {
  const result = reducedKeys.reduce((acc, keyInfo, idx, arr) => {
    const newAcc = idx === 0 ? `${acc}\n` : `${acc},\n`;
    const indent = '    '.repeat(level) + ' ';
    const newLevel = level + 1;
    let row;
    let exported;

    switch (keyInfo.type) {
      case 'hasChildren':
        exported = parse(keyInfo.value, newLevel);
        row = `   ${indent}${keyInfo.name}: ${exported}`;
        break;

      case 'unchanged':
        exported = parse(keyInfo.value, newLevel);
        row = `   ${indent}${keyInfo.name}: ${exported}`;
        break;

      case 'changed':
        const exportedOld = parse(keyInfo.oldValue, newLevel);
        const exportedNew = parse(keyInfo.newValue, newLevel);
        row = ` ${indent}- ${keyInfo.name}: ${exportedOld}`;
        row += idx < arr.length - 1 ? ',\n' : '\n';
        row += ` ${indent}+ ${keyInfo.name}: ${exportedNew}`;
        break;

      case 'added':
        exported = parse(keyInfo.value, newLevel);
        row = ` ${indent}+ ${keyInfo.name}: ${exported}`;
        break;

      case 'deleted':
        exported = parse(keyInfo.value, newLevel);
        row = ` ${indent}- ${keyInfo.name}: ${exported}`;
        break;

      default:
        break;
    }

    return newAcc + row;
  }, '{');

  const additional = '\n' + '    '.repeat(level) + '}';
  return result + additional;
};

export default parseCompared;
