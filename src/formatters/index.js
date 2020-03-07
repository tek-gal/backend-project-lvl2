import json from './json.js';
import plain from './plain.js';
import windiff from './windiff.js';

const mapper = {
  json,
  plain,
  windiff,
};


export default (compared, format) => {
  if (Object.keys(mapper).includes(format)) {
    return mapper[format](compared);
  }

  throw Error(`Unknown format: ${format}!`);
};
