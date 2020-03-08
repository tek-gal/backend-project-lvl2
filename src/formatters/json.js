import _ from 'lodash';

export default (reducedKeys) => JSON
  .stringify(reducedKeys, (key, value) => {
    // я не знаю почему, но числа из ини парсятся как строки
    if (_.isBoolean(value)) return value;
    if (!_.isNaN(+value)) return +value;

    return value;
  }, 2);
