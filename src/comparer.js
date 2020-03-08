import _ from 'lodash';

const parseValue = (value, func) => (value instanceof Object
  ? func(value, value)
  : value);

const keyTypes = [
  {
    type: 'nested',
    check: (obj1, obj2, key) => obj1[key] instanceof Object
      && obj2[key] instanceof Object,
    run: (oldValue, newValue, func) => ({ children: func(oldValue, newValue) }),
  },
  {
    type: 'added',
    check: (obj1, obj2, key) => _.has(obj2, key) && !_.has(obj1, key),
    run: (oldValue, newValue, func) => ({ newValue: parseValue(newValue, func) }),
  },
  {
    type: 'deleted',
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    run: (oldValue, newValue, func) => ({ oldValue: parseValue(oldValue, func) }),
  },
  {
    type: 'changed',
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    run: (oldValue, newValue, func) => ({
      oldValue: parseValue(oldValue, func),
      newValue: parseValue(newValue, func),
    }),
  },
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    run: (oldValue, newValue, func) => ({ oldValue: parseValue(oldValue, func) }),
  },
];

const compare = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const compared = keys.map((key) => {
    const { type, run } = keyTypes.find(({ check }) => check(obj1, obj2, key));
    const processed = run(obj1[key], obj2[key], compare);

    return {
      type,
      name: key,
      ...processed,
    };
  });

  return compared;
};

export default compare;
