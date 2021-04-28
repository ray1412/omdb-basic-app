import flowRight from 'lodash/flowRight';
import isObject from 'lodash/isObject';
import keys from 'lodash/keys';
import reduce from 'lodash/reduce';
import get from 'lodash/get';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
import toLower from 'lodash/toLower';
import chain from 'lodash/chain';

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
  toLower,
  chain
});

// Executes the chain sequence to resolve the unwrapped value
// For some reasons, .value() cannot be inserted inside mixin
_.prototype.value = value;

export default _;
