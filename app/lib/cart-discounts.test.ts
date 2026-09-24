import assert from 'node:assert/strict';
import {test} from 'node:test';

import {
  applyDiscountCodesUpdate,
  shouldUpdateDiscountCodes,
} from './cart-discounts.ts';

test('shouldUpdateDiscountCodes stays true when the cart has 2+ lines', () => {
  assert.equal(shouldUpdateDiscountCodes(2), true);
  assert.equal(shouldUpdateDiscountCodes(5), true);
});

test('shouldUpdateDiscountCodes stays true for empty and single-line carts', () => {
  assert.equal(shouldUpdateDiscountCodes(0), true);
  assert.equal(shouldUpdateDiscountCodes(1), true);
});

test('applyDiscountCodesUpdate does not short-circuit when lineCount > 1', async () => {
  const calls: string[][] = [];

  const result = await applyDiscountCodesUpdate(
    async (discountCodes) => {
      calls.push(discountCodes);
      return {applied: discountCodes};
    },
    ['MAPLE10'],
    2,
  );

  assert.deepEqual(calls, [['MAPLE10']]);
  assert.deepEqual(result, {applied: ['MAPLE10']});
});
