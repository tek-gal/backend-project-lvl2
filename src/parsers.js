import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const parserMapper = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: (data) => {
    const iter = (obj) => Object
      .entries(obj)
      .reduce((acc, [key, value]) => {
        let newValue = value;

        if (_.isObject(value)) {
          newValue = iter(value);
        } else if (!_.isBoolean(value) && !_.isNaN(+value)) {
          newValue = +value;
        }

        return { ...acc, [key]: newValue };
      }, {});

    return iter(ini.parse(data));
  },
};

export default (dataType, data) => parserMapper[dataType](data);
