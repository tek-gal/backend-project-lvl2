const parse = (value, level) => {
  let result;

  if (value instanceof Object){
    result = parseCompared(value, level);
  } else {
    result = value;
  }

  return result;
}

function parseCompared(reducedKeys, level = 0) {
  const result = reducedKeys.reduce((acc, keyInfo, idx, arr) => {
    const newAcc = idx === 0 ? `${acc}\n` : `${acc},\n`;
    const indent = '    '.repeat(level) + ' ';
    const newLevel = level + 1;
    let row;
    let exported;

    switch (keyInfo.type) {
      case 'object':
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

  // const compared = reducedKeys.reduce((acc, keyInfo) => {
  //   const indent = '  '.repeat(level) + ' ';
  //   let row;
  //
  //   switch (keyInfo.type) {
  //     case 'object':
  //     const newLevel = level + 1;
  //       row = {
  //         [` ${indent}${keyInfo.name}`]: parseCompared(keyInfo.value, level),
  //       }
  //       break;
  //
  //     case 'unchanged':
  //       row = {
  //         [` ${indent}${keyInfo.name}`]: keyInfo.value,
  //       };
  //       break;
  //
  //     case 'changed':
  //       row = {
  //         [`-${indent}${keyInfo.name}`]: keyInfo.oldValue,
  //         [`+${indent}${keyInfo.name}`]: keyInfo.newValue,
  //       };
  //       break;
  //
  //     case 'added':
  //       row = {
  //         [`+${indent}${keyInfo.name}`]: keyInfo.value,
  //       };
  //       break;
  //
  //     case 'deleted':
  //       row = {
  //         [`-${indent}${keyInfo.name}`]: keyInfo.value,
  //       };
  //       break;
  //
  //     default:
  //       break;
  //   }
  //
  //   return { ...acc, ...row };
  // }, {});
  //
  // return JSON
  //   .stringify(compared)
  //   .replace(/\{/g, '{\n  ')
  //   .replace(/\}/g, '\n}')
  //   .replace(/,/g, ',\n  ')
  //   .replace(/"/g, '')
  //   .replace(/:/g, ': ');

export default parseCompared;
