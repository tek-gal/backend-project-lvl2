import _ from 'lodash';

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
    run: (oldValue, newValue) => ({ newValue }),
  },
  {
    type: 'deleted',
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    run: (oldValue) => ({ oldValue }),
  },
  {
    type: 'changed',
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    run: (oldValue, newValue) => ({
      oldValue,
      newValue,
    }),
  },
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    run: (oldValue) => ({ oldValue }),
  },
];

const compare = (obj1, obj2) => _
  .union(Object.keys(obj1), Object.keys(obj2))
  .map((key) => {
    const { type, run } = keyTypes.find(({ check }) => check(obj1, obj2, key));

    return {
      type,
      name: key,
      ...run(obj1[key], obj2[key], compare),
    };
  });

export default compare;
