const parseCompared = (reducedKeys, level=0) => {
  const result = reducedKeys.reduce((acc, keyInfo, idx, arr) => {
    const newAcc = idx === 0 ? `${acc}\n` : `${acc},\n`;
    const indent = '  '.repeat(level) + ' ';
    let row;

    switch (keyInfo.type) {
      case 'object':
        const newLevel = level + 1;
        row = `   ${indent}${keyInfo.name}: ${parseCompared(keyInfo.value, newLevel)}`
        break;

      case 'unchanged':
        row = `   ${indent}${keyInfo.name}: ${keyInfo.value}`;
        break;

      case 'changed':
        row = `  -${indent}${keyInfo.name}: ${keyInfo.oldValue}`;
        row += idx < arr.length - 1 ? ',\n' : '\n';
        row += `  +${indent}${keyInfo.name}: ${keyInfo.newValue}`;
        break;

      case 'added':
        row = `  +${indent}${keyInfo.name}: ${keyInfo.value}`;
        break;

      case 'deleted':
        row = `  -${indent}${keyInfo.name}: ${keyInfo.value}`;
        break;

      default:
        break;
    }

    return newAcc + row;
  }, '{');

  let additional = '\n' + '  '.repeat(level);
  additional += level === 0 ? '}' : '  }';
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
