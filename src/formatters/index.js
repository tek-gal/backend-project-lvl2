import json from './json.js';
import plain from './plain.js';
import diff from './diff.js';

const mapper = {
  json,
  plain,
  diff,
};


export default (compared, format) => mapper[format](compared);
