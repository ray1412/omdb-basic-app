import flowRight from 'lodash/flowRight';
import isObject from 'lodash/isObject';
import keys from 'lodash/keys';
import reduce from 'lodash/reduce';
import get from 'lodash/get';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
import toLower from 'lodash/toLower';
import toUpper from 'lodash/toUpper';
import set from 'lodash/set';
import uniqueId from 'lodash/uniqueId'
import chain from 'lodash/chain';
import isNil from 'lodash/isNil';
import debounce from 'lodash/debounce';
import slice from 'lodash/slice';
import map from 'lodash/map';
import includes from 'lodash/includes';

import value from 'lodash/value';
import mixin from 'lodash/mixin';
import wrapperLodash from 'lodash/wrapperLodash';

const _ = mixin(wrapperLodash, {
  flowRight,
  isObject,
  keys,
  reduce,
  get,
  omit,
  isEmpty,
  toUpper,
  toLower,
  set,
  uniqueId,
  isNil,
  debounce,
  slice,
  map,
  includes,
  chain,
});

// Executes the chain sequence to resolve the unwrapped value
// For some reasons, .value() cannot be inserted inside mixin
_.prototype.value = value;

export default _;
