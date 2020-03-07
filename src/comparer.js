import _ from 'lodash';

const keyTypes = [
  {
    type: 'complex',
    check: (obj1, obj2, key) => obj1[key] instanceof Object
      && obj2[key] instanceof Object,
    run: (oldValue, newValue) => ({ children: compare(oldValue, newValue) }),
  },
  {
    type: 'added',
    check: (obj1, obj2, key) => _.has(obj2, key) && !_.has(obj1, key),
    run: (oldValue, newValue) => ({ newValue: parseValue(newValue) }),
  },
  {
    type: 'deleted',
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    run: (oldValue) => ({ oldValue: parseValue(oldValue) }),
  },
  {
    type: 'changed',
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    run: (oldValue, newValue) => ({
      oldValue: parseValue(oldValue),
      newValue: parseValue(newValue),
    }),
  },
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    run: (oldValue) => ({ oldValue: parseValue(oldValue) }),
  },
];

const compare = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const compared = keys.map((key) => {
    const { type, run } = keyTypes.find(({ check }) => check(obj1, obj2, key));
    const processed = run(obj1[key], obj2[key]);

    return {
      type,
      name: key,
      ...processed,
    };
  });

  return compared;
};

const parseValue = (value) => (value instanceof Object
  ? compare(value, value)
  : value);

export default compare;
