import json from './json.js';
import plain from './plain.js';
import windiff from './windiff.js';

const mapper = {
  json,
  plain,
  windiff,
};


export default (compared, format) => mapper[format](compared);
