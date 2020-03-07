import toJSON from './json.js';
import toPlain from './plain.js';
import toDefault from './default.js';

const mapper = {
  json: toJSON,
  plain: toPlain,
  default: toDefault,
};


export default (compared, format) => {
  if (Object.keys(mapper).includes(format)) {
    return mapper[format](compared);
  }

  throw Error(`Unknown format: ${format}!`);
};
