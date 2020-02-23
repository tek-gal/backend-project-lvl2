import _ from 'lodash';

const reduceCommonKeys = (commonKeys, obj1, obj2) => commonKeys
  .reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    let result;

    if (value1 === value2) {
      result = {
        type: 'unchanged',
        name: key,
        value: value1,
      };
    } else {
      result = {
        type: 'changed',
        name: key,
        oldValue: value1,
        newValue: value2,
      };
    }

    return [...acc, result];
  }, []);

const reduceDifferentKeys = (differentKeys, obj1, obj2) => differentKeys
  .reduce((acc, key) => {
    let result;

    if (_.has(obj1, key)) {
      result = {
        type: 'deleted',
        name: key,
        value: obj1[key],
      };
    } else {
      result = {
        type: 'added',
        name: key,
        value: obj2[key],
      };
    }

    return [...acc, result];
  }, []);

export default (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const differentKeys = _.xor(keys1, keys2);
  const commonKeys = _.intersection(keys1, keys2);
  const result = [
    ...reduceCommonKeys(commonKeys, obj1, obj2),
    ...reduceDifferentKeys(differentKeys, obj1, obj2),
  ];

  return result;
};
