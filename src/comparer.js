import _ from 'lodash';

const keysMapper = {
  unchanged(key, obj1) {
    return {
      type: 'unchanged',
      name: key,
      value: this.parseValue(obj1[key]),
    };
  },
  changed(key, obj1, obj2) {
    return {
      type: 'changed',
      name: key,
      oldValue: this.parseValue(obj1[key]),
      newValue: this.parseValue(obj2[key]),
    };
  },
  deleted(key, obj1) {
    return {
      type: 'deleted',
      name: key,
      value: this.parseValue(obj1[key]),
    };
  },
  added(key, obj1, obj2) {
    return {
      type: 'added',
      name: key,
      value: this.parseValue(obj2[key]),
    };
  },
  complex(key, obj1, obj2) {
    return {
      type: 'complex',
      name: key,
      value: compare(obj1[key], obj2[key]),
    };
  },

  parseValue(value) {
    let result = value;

    if (value instanceof Object) {
      result = Object
        .entries(value)
        .map(([key, v]) => ({
          type: 'unchanged',
          name: key,
          value: v,
        }));
    }

    return result;
  },
};

const compareCommonKeys = (commonKeys, obj1, obj2) => commonKeys
  .reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    let result;

    if (value1 instanceof Object
      && value2 instanceof Object) {
      result = keysMapper.complex(key, obj1, obj2);
    } else if (value1 === value2) {
      result = keysMapper.unchanged(key, obj1, obj2);
    } else {
      result = keysMapper.changed(key, obj1, obj2);
    }

    return [...acc, result];
  }, []);

const compareDifferentKeys = (differentKeys, obj1, obj2) => differentKeys
  .reduce((acc, key) => {
    let result;

    if (_.has(obj1, key)) {
      result = keysMapper.deleted(key, obj1, obj2);
    } else {
      result = keysMapper.added(key, obj1, obj2);
    }

    return [...acc, result];
  }, []);

const compare = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const differentKeys = _.xor(keys1, keys2);
  const commonKeys = _.intersection(keys1, keys2);

  const result = [
    ...compareCommonKeys(commonKeys, obj1, obj2),
    ...compareDifferentKeys(differentKeys, obj1, obj2),
  ];

  return result;
};

export default compare;
