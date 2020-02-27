import _ from 'lodash';

const parseValue = (value) => {
  let result;

  if (value instanceof Object) {
    result = Object.entries(value)
      .map(([key, v]) => ({
        type: 'unchanged',
        name: key,
        value: v,
      }));
  } else {
    result = value;
  }

  return result;
};

const compareCommonKeys = (commonKeys, obj1, obj2) => commonKeys
  .reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    let result;

    if (value1 instanceof Object
      && value2 instanceof Object) {
      result = {
        type: 'hasChildren',
        name: key,
        value: compare(value1, value2),
      };
    } else if (value1 === value2) {
      result = {
        type: 'unchanged',
        name: key,
        value: value1,
      };
    } else {
      result = {
        type: 'changed',
        name: key,
        oldValue: parseValue(value1),
        newValue: parseValue(value2),
      };
    }

    return [...acc, result];
  }, []);

function compareDifferentKeys(differentKeys, obj1, obj2) {
  return differentKeys
    .reduce((acc, key) => {
      let result;

      if (_.has(obj1, key)) {
        result = {
          type: 'deleted',
          name: key,
          value: parseValue(obj1[key]),
        };
      } else {
        result = {
          type: 'added',
          name: key,
          value: parseValue(obj2[key]),
        };
      }

      return [...acc, result];
    }, []);
}

function compare(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const differentKeys = _.xor(keys1, keys2);
  const commonKeys = _.intersection(keys1, keys2);

  const result = [
    ...compareCommonKeys(commonKeys, obj1, obj2),
    ...compareDifferentKeys(differentKeys, obj1, obj2),
  ];

  return result;
}

export default compare;
