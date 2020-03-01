import toJSON from './json.js';
import toPlain from './plain.js';

const mapper = {
  json: toJSON,
  plain: toPlain,
};


export default (format, compared) => {
  if (Object.keys(mapper).includes(format)) {
    return mapper[format](compared);
  }

  throw Error('Unknown format!');
};
