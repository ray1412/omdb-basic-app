import originalProduce, { enableES5 } from 'immer';

/**
 * Wrap original produce to include plugin init
 * source: https://github.com/immerjs/immer/issues/610#issuecomment-635999663
 *
 * @param {any} base - the initial state
 * @param {Function} producer - function that receives a proxy of the base state as first argument and which can be freely modified
 * @param {Function} patchListener - optional function that will be called with all the patches produced here
 * @returns {any} a new state, or the initial state if nothing was modified
 */
export function produce(base, producer, patchListener) {
  // Immer plugin init
  enableES5();

  return originalProduce(base, producer, patchListener);
}
