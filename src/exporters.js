export default (reducedKeys) => {
  const compared = reducedKeys.reduce((acc, keyInfo) => {
    let row;

    switch (keyInfo.type) {
      case 'unchanged':
        row = {
          [`  ${keyInfo.name}`]: keyInfo.value,
        };
        break;

      case 'changed':
        row = {
          [`- ${keyInfo.name}`]: keyInfo.oldValue,
          [`+ ${keyInfo.name}`]: keyInfo.newValue,
        };
        break;

      case 'added':
        row = {
          [`+ ${keyInfo.name}`]: keyInfo.value,
        };
        break;

      case 'deleted':
        row = {
          [`- ${keyInfo.name}`]: keyInfo.value,
        };
        break;

      default:
        break;
    }

    return { ...acc, ...row };
  }, {});

  return JSON
    .stringify(compared)
    .replace(/\{/g, '{\n  ')
    .replace(/\}/g, '\n}')
    .replace(/,/g, ',\n  ')
    .replace(/"/g, '')
    .replace(/:/g, ': ');
};
