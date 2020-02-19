import _ from 'lodash';
import fs from 'fs';

const mergeObjects = (firstObject, secondObject) => {
  const customizer = (objValue, srcValue) => [objValue, srcValue];
  const newFirstObject = Object.assign({}, firstObject);

  Object
    .keys(newFirstObject)
    .forEach((key) => {
      if (!_.has(secondObject, key)) {
        newFirstObject[key] = [firstObject[key], undefined];
      }
    });

  return _.mergeWith(newFirstObject, secondObject, customizer);
};

const toJSON = (object) => JSON
  .stringify(object)
  .replace(/\{/g, '{\n  ')
  .replace(/\}/g, '\n}')
  .replace(/,/g, ',\n  ')
  .replace(/"/g, '')
  .replace(/:/g, ': ');

const parseMergedObject = (mergedObject) => Object
  .entries(mergedObject)
  .reduce((acc, [key, value]) => {
    const [firstValue, secondValue] = value;
    let newAcc;

    if (firstValue === undefined) {
      const newKey = `+ ${key}`;
      newAcc = { ...acc, [newKey]: secondValue };
    }

    if (secondValue === undefined) {
      const newKey = `- ${key}`;
      newAcc = { ...acc, [newKey]: firstValue };
    }

    if (firstValue === secondValue) {
      const newKey = `  ${key}`;
      newAcc = { ...acc, [newKey]: firstValue };
    }

    if (firstValue !== secondValue) {
      const key1 = `- ${key}`;
      const key2 = `+ ${key}`;
      newAcc = { ...acc, [key1]: firstValue, [key2]: secondValue };
    }

    return newAcc;
  }, {});

// const compareArrays = (arr1, arr2) => {
//
// };

const compareObjects = (obj1, obj2) => {
  const mergedObject = mergeObjects(obj1, obj2);
  const parsedObject = parseMergedObject(mergedObject);
  return parsedObject;
};

export default (firstConfig, secondConfig) => {
  const firstFileJson = fs.readFileSync(firstConfig, 'utf-8');
  const secondFileJson = fs.readFileSync(secondConfig, 'utf-8');

  const firstObject = JSON.parse(firstFileJson);
  const secondObject = JSON.parse(secondFileJson);

  const compared = compareObjects(firstObject, secondObject);

  return toJSON(compared);
};
