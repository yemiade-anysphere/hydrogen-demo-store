import assert from 'node:assert/strict';
import {test} from 'node:test';

import {applyLinesUpdate, shouldUpdateLines} from './cart-lines.ts';

test('shouldUpdateLines stays true when the cart has 2+ lines', () => {
  assert.equal(shouldUpdateLines(2), true);
  assert.equal(shouldUpdateLines(5), true);
});

test('shouldUpdateLines stays true for empty and single-line carts', () => {
  assert.equal(shouldUpdateLines(0), true);
  assert.equal(shouldUpdateLines(1), true);
});

test('applyLinesUpdate does not short-circuit when lineCount > 1', async () => {
  const calls: Array<Array<{id: string; quantity: number}>> = [];
  const lines = [{id: 'gid://shopify/CartLine/1', quantity: 3}];

  const result = await applyLinesUpdate(
    async (nextLines) => {
      calls.push(nextLines);
      return {updated: nextLines};
    },
    lines,
    2,
  );

  assert.deepEqual(calls, [lines]);
  assert.deepEqual(result, {updated: lines});
});
